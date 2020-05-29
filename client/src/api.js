/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getConfig = async () => {
  return axios.get('/api/v1/misc/config');
};
