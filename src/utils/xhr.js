import NProgress from 'nprogress';
import { API_HOST } from '../config';

// export async function xhr(method, endpoint, data) {
//   NProgress.start();
//   NProgress.set(0.4);
//   try {
//     const opts = {};
//     if (method !== 'get') {
//       if (data) {
//         opts.body = JSON.stringify(data);
//       }
//       opts.headers = {
//         'Content-Type': 'application/json',
//       };
//     }
//     const res = await fetch(`${API_HOST}${endpoint}`, opts);
//     const { result } = await res.json();
//     return result;
//   } catch (e) {
//     throw e;
//   } finally {
//     NProgress.done();
//   }
// }

export default async function xhr(method, endpoint, data = {}) {
  NProgress.start();
  NProgress.set(0.4);
  try {
    const res = await fetch(window.location.hostname === 'localhost' ? 'http://localhost:7878' : '/', {
      method: 'POST',
      body: JSON.stringify({ data, endpoint, method }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (e) {
    throw e;
  } finally {
    NProgress.done();
  }
}
