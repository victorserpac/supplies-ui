/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupplyService } from './supply.service';

describe('SupplyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplyService]
    });
  });

  it('should ...', inject([SupplyService], (service: SupplyService) => {
    expect(service).toBeTruthy();
  }));
});
