import { TestBed } from '@angular/core/testing';

import { GruposTecnicosService } from './grupos-tecnicos.service';

describe('GruposTecnicosService', () => {
  let service: GruposTecnicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposTecnicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
