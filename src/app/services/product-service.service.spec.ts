
import { ProductServiceService } from './product-service.service';
import {lastValueFrom, Observable, of, throwError} from 'rxjs';

const mockProductsResponse = [
  {
    id: 1,
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 2,
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras'
  },
  {
    id: 3,
    name: 'Phone Standard',
    price: 299,
    description: ''
  }
];

describe('ProductServiceService', () => {

  const wrapperService = (httpClient) => {
    return new ProductServiceService(httpClient);
  };

  it('should be created', () => {
    const httpClient: any ={};
    const service = wrapperService(httpClient);
    expect(service).toBeTruthy();
  });

  it('should fetch product list', async () => {
    const httpClient: any ={
      get: jest.fn((url:string)=> of(mockProductsResponse))
    };
    const service = wrapperService(httpClient);

    const products = await lastValueFrom(service.fetchProducts());
    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/products', expect.any(Object));
    expect(products.length).toBe(3);
  });

  it('should handle error on fetchProducts', async ( ) => {
    const httpClient: any ={
      get: jest.fn((url:string)=> throwError(()=>new Error('fake error')))
    };
  const service = wrapperService(httpClient);
  
  try{
  await lastValueFrom(service.fetchProducts());
  expect(null).toBeTruthy();
  } catch(e) {
    expect(e.message).toBe('fake error')
  }

  expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/products', expect.any(Object));

  });
});
