import { TestBed } from '@angular/core/testing';

import { DesarrolloPService } from './desarrollo-p.service';

describe('DesarrolloPService', () => {
  let service: DesarrolloPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesarrolloPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
