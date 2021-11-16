
import { ProductServiceService } from './product-service.service';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  const httpClient: any = {get: jest.fn()};

  beforeEach(() => {
    service = new ProductServiceService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
