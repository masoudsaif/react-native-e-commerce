import AXIOS from 'axios';

import {BASE_URL} from './api';
import {sensitiveStorage} from '../../redux/reducers/reducer';
import {TOKEN} from './keys';

const axios = AXIOS.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

(async () => {
  sensitiveStorage.getItem(TOKEN).then((token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  });
})();

export default axios;
