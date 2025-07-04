import axios from 'axios';

import { constructStorageURL } from '@/utils/helpers';

import type { Config } from './types';

export const config = () =>
  axios.get<Config>(constructStorageURL('config.json'), {
    headers: { 'Content-Type': 'application/json' },
  });
