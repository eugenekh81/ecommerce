import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
};

export const fetchProducts = async ({ url, method = 'get' }: Props) => {
  try {
    const response = await axios.request({ url: `${BASE_URL}${url}`, method });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProduct = async ({ url, method = 'get' }: Props) => {
  try {
    const response = await axios[method](`${BASE_URL}${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
