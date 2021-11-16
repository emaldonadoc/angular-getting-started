
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
  let service: ProductServiceService;
  
  const httpClient: any ={
    get: jest.fn((url:string)=> ({ pipe: (r, e) => of(mockProductsResponse)}))
};

  beforeEach(() => {
    service = new ProductServiceService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product list', async () => {
    const products = await lastValueFrom(service.fetchProducts());
    expect(httpClient.get).toHaveBeenCalledWith('http://localhost:3000/products');
    expect(products.length).toBe(3);
  });
});
