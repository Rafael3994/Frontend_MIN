import { TestBed } from '@angular/core/testing';

import { ToplistService } from './toplist.service';

describe('ToplistService', () => {
  let service: ToplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
