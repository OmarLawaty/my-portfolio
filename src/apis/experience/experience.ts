import axios from 'axios';

import { constructStorageURL } from '@/utils/helpers';

import type { Experience } from './types';

export const experience = () =>
  axios.get<Experience>(constructStorageURL('experience.json '), {
    headers: { 'Content-Type': 'application/json' },
  });
