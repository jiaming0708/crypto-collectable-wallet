import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Image,
  Text,
  CardFooter,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
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
    <Card height='100vh' position='relative'>
      <CardHeader width='100%'>
        <Flex justifyContent='space-between'>
          <IconButton
            variant='ghost'
            icon={<ArrowBackIcon />}
            as={Link}
            href='../'
            aria-label='back home'
          />
          {data.detail ? (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>API request failure!</AlertTitle>
              <AlertDescription>{data.detail}</AlertDescription>
            </Alert>
          ) : <Heading as='h1'>{data.collection.name}</Heading>}
        </Flex>
      </CardHeader>
      {!data.detail &&
        <>
          <CardBody style={{ textAlign: 'center' }}>
            <Image src={data.image_url} display='inline' />
            <Heading as='h2'>{data.name}</Heading>
            <Text>{data.description}</Text>
          </CardBody>
          <CardFooter justifyContent='center' position='sticky' bottom='0'>
            <Button as={Link} href={data.permalink} target='_blank'>
              permalink
            </Button>
          </CardFooter>
        </>
      }
    </Card>
  );
}
