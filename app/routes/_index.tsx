import { json } from '@remix-run/node';
import { useLoaderData, Link as RemixLink } from '@remix-run/react';
import { Image, Heading, Flex, Link as ChakraLink } from '@chakra-ui/react';
import type { Assets } from '../interface/assets';

export async function loader() {
  const res = await fetch(
    `https://testnets-api.opensea.io/api/v1/assets?owner=0x85fD692D2a075908079261F5E351e7fE0267dB02`,
  );
  return json<Assets>(await res.json());
}

export default function Index() {
  const { assets } = useLoaderData<typeof loader>();

  return (
    <Flex flexWrap='wrap'>
      {assets.map((asset) => (
        <ChakraLink key={asset.id} width='50%' as={RemixLink} to={`/${asset.asset_contract.address}/${asset.token_id}`}>
          <Image
            src={asset.image_url}
            alt={asset.description}
          />
          <Heading>{asset.name}</Heading>
        </ChakraLink>
      ))}
    </Flex>
  );
}
