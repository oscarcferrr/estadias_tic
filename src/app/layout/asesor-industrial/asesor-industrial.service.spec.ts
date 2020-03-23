import { TestBed } from '@angular/core/testing';

import { AsesorIndustrialService } from './asesor-industrial.service';

describe('AsesorIndustrialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsesorIndustrialService = TestBed.get(AsesorIndustrialService);
    expect(service).toBeTruthy();
  });
});
