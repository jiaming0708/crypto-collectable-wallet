import { Button, Card, CardBody, CardHeader, Flex, Heading, Link, Image, Text, CardFooter, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Asset } from '~/interface/assets';

export async function loader({ params }: LoaderArgs) {
  const res = await fetch(
    `https://testnets-api.opensea.io/api/v1/asset/${params.address}/${params.id}`,
  );
  return json<Asset>(await res.json());
}

export default function Detail() {
  const data = useLoaderData<typeof loader>();

  return (
    <Card>
      <CardHeader width='100%'>
        <Flex justifyContent='space-between'>
          <IconButton variant='ghost' icon={<ArrowBackIcon />} as={Link} href='/' aria-label='back home' />
          <Heading as='h1'>{data.collection.name}</Heading>
        </Flex>
      </CardHeader>
      <CardBody style={{textAlign:'center'}}>
        <Image src={data.image_url} display='inline' />
        <Heading as='h2'>{data.name}</Heading>
        <Text>{data.description}</Text>
      </CardBody>
      <CardFooter justifyContent='center'>
        <Button as={Link} href={data.permalink} target='_blank'>permalink</Button>
      </CardFooter>
    </Card>
  );
}
