
import { ProductServiceService } from './product-service.service';
import {lastValueFrom, of} from 'rxjs';

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
  
  const httpClient: any ={
    get: jest.fn((url:string)=> ({ pipe: (r, e) => of(mockProductsResponse)}))
};

  const wrapperService = () => {
    return new ProductServiceService(httpClient);
  };

  it('should be created', () => {
    let service = wrapperService();
    expect(service).toBeTruthy();
  });

  it('should fetch product list', async () => {
    let service = wrapperService();

    const products = await lastValueFrom(service.fetchProducts());
    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/products');
    expect(products.length).toBe(3);
  });
});
