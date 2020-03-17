import { TestBed } from '@angular/core/testing';

import { AsesorAcademicoService } from './asesor-academico.service';

describe('AsesorAcademicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsesorAcademicoService = TestBed.get(AsesorAcademicoService);
    expect(service).toBeTruthy();
  });
});
