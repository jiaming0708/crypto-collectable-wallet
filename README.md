# Crypto collectable wallet

## requirement
There are two pages: list page and detail page. Use client side navigation to switch between different pages.
### list page
1. Use OpenSea API (Testnet) to get the collectables in this Ethereum account `0x85fD692D2a075908079261F5E351e7fE0267dB02`.
2. Implement pagination. Get 20 items each time and fetch the next 20 when user reaches the end of the page (infinite scrolling)

#### API
EndPoint: https://testnets-api.opensea.io/api/v1/assets GET Method
Parameters:
- owner={address}
- offset=0...N
- limit=20

More Documentation: https://docs.opensea.io/v1.0/reference/getting-assets

### detail page
#### API
EndPoint: https://testnets-api.opensea.io/api/v1/asset/{asset_contract_address}/{token_id}/ GET Method

More Documentation: https://docs.opensea.io/v1.0/reference/retrieving-a-single-asset-testnets

## tech stack
- [Remix](https://remix.run/docs/en/1.19.2)
- [Chakra-ui](https://chakra-ui.com/)

## run this project
make sure your environment
- Node.js version 14 or greater
- npm 7 or greater

run the `build`
```shell
npm run build
```
That should output something like this:
```
 info  building... (NODE_ENV=production)
 info  built (846ms)
```

run the built app now
```shell
npm start
```
This will start the server and output this:
```
Remix App Server started at http://localhost:3000
```