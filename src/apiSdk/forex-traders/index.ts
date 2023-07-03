import axios from 'axios';
import queryString from 'query-string';
import { ForexTraderInterface, ForexTraderGetQueryInterface } from 'interfaces/forex-trader';
import { GetQueryInterface } from '../../interfaces';

export const getForexTraders = async (query?: ForexTraderGetQueryInterface) => {
  const response = await axios.get(`/api/forex-traders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createForexTrader = async (forexTrader: ForexTraderInterface) => {
  const response = await axios.post('/api/forex-traders', forexTrader);
  return response.data;
};

export const updateForexTraderById = async (id: string, forexTrader: ForexTraderInterface) => {
  const response = await axios.put(`/api/forex-traders/${id}`, forexTrader);
  return response.data;
};

export const getForexTraderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/forex-traders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteForexTraderById = async (id: string) => {
  const response = await axios.delete(`/api/forex-traders/${id}`);
  return response.data;
};
