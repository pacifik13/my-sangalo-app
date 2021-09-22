import { TestBed } from '@angular/core/testing';

import { BasicauthttpinterceptorService } from './BasicAuthHttpInterceptor.service';

describe('BasicauthttpinterceptorService', () => {
  let service: BasicauthttpinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicauthttpinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
