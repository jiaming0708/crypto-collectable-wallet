import { json } from '@remix-run/node';
import type { LoaderArgs} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Image, Heading, Link as ChakraLink, Grid } from '@chakra-ui/react';
import type { Assets } from '../interface/assets';

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

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
      padding='1rem'
      gap='0.5rem'
      justifyItems='center'
    >
      {assets.map((asset) => (
        <ChakraLink key={asset.id} href={`/${asset.asset_contract.address}/${asset.token_id}`}>
          <Image src={asset.image_url} alt={asset.description} margin='0 auto 0.25rem' />
          <Heading textAlign='center'>{asset.name}</Heading>
        </ChakraLink>
      ))}
    </Grid>
  );
}
