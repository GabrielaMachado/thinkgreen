import { TestBed } from '@angular/core/testing';

import { BolsitaService } from './bolsita.service';

describe('BolsitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BolsitaService = TestBed.get(BolsitaService);
    expect(service).toBeTruthy();
  });
});
