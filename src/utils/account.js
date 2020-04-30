import NProgress from 'nprogress';
import Cosmos from './cosmos';

// const API_HOST = 'http://testnet.public.bluzelle.com:1317';
const CHAIN_ID = 'bluzelle';

export default new (class extends Cosmos {
  async xhr(method, endpoint, data) {
    NProgress.start();
    NProgress.set(0.4);
    try {
      const res = await fetch(
        window.location.hostname === 'localhost'
          ? 'http://localhost:7878'
          : '/',
        {
          method: 'POST',
          body: JSON.stringify({ data, endpoint, method }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.json();
    } finally {
      NProgress.done();
    }
  }
})({
  // host: API_HOST,
  chainId: CHAIN_ID,
});
