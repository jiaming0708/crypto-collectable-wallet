import { useEffect, useState } from 'react';
import type { LoaderArgs} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Image, Heading, Link as ChakraLink, Grid, Spinner } from '@chakra-ui/react';

import type { Asset, Assets } from '../interface/assets';
import { InfiniteScroller } from '~/components/InfiniteScroll';

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const offset = url.searchParams.get("offset") || '0';
  const limit = '20';
  var params = new URLSearchParams({
    owner: '0x85fD692D2a075908079261F5E351e7fE0267dB02',
    limit: limit,
    offset: offset,
  });

  const res = await fetch(
    `https://testnets-api.opensea.io/api/v1/assets?${params}`,
  );
  return json<Assets>(await res.json());
}

export default function Index() {
  const { assets } = useLoaderData<typeof loader>();
  const [data, setData] = useState<Asset[]>(assets);
  const [isEnd, setEnd] = useState(false);
  const fetcher = useFetcher<typeof loader>();
  const loadingState = 'loading';

  useEffect(() => {
    if (!fetcher.data || fetcher.state === loadingState) {
      return;
    }

    // ignore API exception
    if (fetcher.data.detail) {
      return;
    }

    if (fetcher.data.assets.length === 0) {
      setEnd(true);
      return;
    }

    const newItems = fetcher.data.assets;
    setData((prevAssets) => [...prevAssets, ...newItems]);
  }, [fetcher.data]);

  const loadNext = () => {
    // ignore fetch when data is end
    if (isEnd) return;
    // trigger loader to fetch data, not update browser url
    const query = `?index&offset=${data.length}`;
    fetcher.load(query);
  };

  return (
    <InfiniteScroller
      loadNext={loadNext}
      loading={fetcher.state === loadingState}
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        padding='1rem'
        gap='0.5rem'
        justifyItems='center'
      >
        {data.map((asset) => (
          <ChakraLink key={asset.id} href={`/${asset.asset_contract.address}/${asset.token_id}`}>
            <Image src={asset.image_url} alt={asset.description} margin='0 auto 0.25rem' />
            <Heading textAlign='center'>{asset.name}</Heading>
          </ChakraLink>
        ))}
      </Grid>
      {fetcher.state === loadingState && <Spinner />}
    </InfiniteScroller>
  );
}
