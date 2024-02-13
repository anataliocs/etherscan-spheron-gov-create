## About

Reference application demonstrating polling the Etherscan API for events emitted from a gov contract built with NestJS.

If you don't already have one, (Create a Spheron account )[https://app.spheron.network/#/signup]

Check out the [Spheron Browser Upload SDK docs](https://docs.spheron.network/sdk/browser/) for more info!

After creating an account, you need to create a [Etherscan Access Token](https://etherscan.com)

### SpheronDevsDAO Contract deployed on Sepolia

- Etherscan: https://sepolia.etherscan.io/address/0x3cb304483fa3d946ABe8dCa89e92760a112b6a59
- Deployed Address:  0x3cb304483fa3d946ABe8dCa89e92760a112b6a59
- Contract:  https://github.com/anataliocs/dao-tutorial/blob/master/backend/contracts/SpheronDevsDAO.sol

    This contract emits a `DeployEvent` upon successful vote of a proposal.  DAO members must have a `SpheronDevs NFT`

### SpheronDevsNFT Contract deployed on Sepolia

- Etherscan: https://sepolia.etherscan.io/address/0xa30AeCeFb798591EB422a841f85A88626CC41204
- Deployed Address:  0xa30AeCeFb798591EB422a841f85A88626CC41204
- Contract:  https://github.com/anataliocs/nft-ipfs/blob/master/hardhat/contracts/SpheronDevs.sol

  This contract is a NFT that gates access to the `SpheronDevsDAO` for voting.


## Local Build(MacOS)

Install dependencies:

```
npm install
```

Create your own env file:

```
cp .env.example .env
```

Then add your Access token to your `.env` file:
```
SPHERON_ACCESS_TOKEN=
```

Spin up local environment (hot reloading included):

_Port set to 3001_

```
# for nest app
npm run start:dev

```

Example cURL to query endpoint locally:
```
curl --location 'localhost:3001/uploadToken/test-bucket'
```

Build Docker Container for running locally on MacOS:
```
docker build --platform linux/arm64 -t nestjs-spheron-uploadtoken-server .
```

## Spheron Build

Build Docker Container for running on a [Spheron Compute Cluster](https://docs.spheron.network/compute/)
```
docker build --platform linux/amd64 -t nestjs-spheron-uploadtoken-server .
```

Push to DockerHub
```
docker tag nestjs-spheron-uploadtoken-serverlatest chrisaspheron/nestjs-spheron-uploadtoken-server:latest
docker push chrisaspheron/nestjs-spheron-uploadtoken-server:latest
```

## Support

Contact chris@spheron.network for questions!