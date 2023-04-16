# Bitcoin Core Json RPC Client

Typescript btcd client. Connect to your bitcoin core node.

### How to use

1 Install package

```
npm install btcd-client
```

2. Import package

```
import { BitcoinCoreClient } from 'btcd-client'
```

3. Initalize

```
const credentials = {
  url: process.env.BITCOIN_RPC_URL!,
  username: process.env.BITCOIN_RPC_USERNAME!,
  password: process.env.BITCOIN_RPC_PASSWORD!,
}

const btcdClient = new BitcoinCoreClient(credentials)
```

4. Use the client

```
const blockchainInfo = await btcdClient.getBlockchainInfo()
```

Wallet Specific

```
const walletInfo = await btcdClient.getWalletInfo(walletName)
```

With params

```
const transaction = await btcdClient.getTransaction(
        walletName!,
        [txReq.txid],
      )
```
