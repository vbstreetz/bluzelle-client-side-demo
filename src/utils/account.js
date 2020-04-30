import NProgress from 'nprogress';
import Cosmos from './cosmos';

// const API_HOST = 'http://testnet.public.bluzelle.com:1317';
const API_HOST =
  window.location.hostname === 'localhost'
    ? 'http://localhost:1319'
    : 'https://bluzelle-client-side-demo.herokuapp.com/blz-chain-proxy';
const CHAIN_ID = 'bluzelle';

export default new (class extends Cosmos {
  async xhr(...args) {
    NProgress.start();
    NProgress.set(0.4);
    try {
      return await super.xhr(...args);
    } finally {
      NProgress.done();
    }
  }

  generateBaseRequestPayload() {
    return {
      BaseReq: {
        chain_id: this.chainId,
        from: this.address,
      },
    };
  }
})({
  host: API_HOST,
  chainId: CHAIN_ID,
  gasInfo: { minFee: '4000001', denom: 'ubnt' },
});
