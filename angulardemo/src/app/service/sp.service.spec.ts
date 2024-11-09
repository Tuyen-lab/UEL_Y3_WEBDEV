import { TestBed } from '@angular/core/testing';

import { SpService } from './sp.service';

describe('SpService', () => {
  let service: SpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
