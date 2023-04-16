import axios, { AxiosInstance } from 'axios'

interface BitcoinCoreCredentials {
  url: string
  username: string
  password: string
}

export class BitcoinCoreClient {
  private client: AxiosInstance
  private id: number

  constructor(credentials: BitcoinCoreCredentials) {
    this.client = axios.create({
      baseURL: credentials.url,
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
    })
    this.id = 0
  }

  private async makeRequest(
    method: string,
    params: any[] = [],
    walletName: string = '',
  ): Promise<any> {
    this.id++
    const data = {
      jsonrpc: '1.0',
      id: this.id,
      method,
      params,
    }

    try {
      let url = ''
      if (walletName !== '') url = `/wallet/${walletName}`
      const response = await this.client.post(url, data)
      return response.data.result
    } catch (error) {
      throw (error as any).response.data.error
    }
  }

  public async getBlockchainInfo(): Promise<any> {
    return await this.makeRequest('getblockchaininfo')
  }

  public async getWalletInfo(walletName: string) {
    return await this.makeRequest('getwalletinfo', [], walletName)
  }

  public async getNewAddress(walletName: string) {
    return await this.makeRequest('getnewaddress', [], walletName)
  }

  public async getTransaction(walletName: string, params: any[]) {
    return await this.makeRequest('gettransaction', params, walletName)
  }

  public async listTransactions(walletName: string) {
    return await this.makeRequest('listtransactions', [], walletName)
  }

  public async listWallets() {
    return await this.makeRequest('listwallets')
  }

  public async restoreWallet(walletName: string, params: any[]) {
    return await this.makeRequest('restorewallet', params, walletName)
  }

  public async sendToAddress(walletName: string, params: any[]) {
    return await this.makeRequest('sendtoaddress', params, walletName)
  }

  public async unloadWallet(walletName: string, params: any[]) {
    return await this.makeRequest('unloadwallet', params, walletName)
  }

  public async walletPassphrase(walletName: string, params: any[]) {
    return await this.makeRequest('walletpassphrase', params, walletName)
  }
}
