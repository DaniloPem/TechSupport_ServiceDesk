import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDesabilitarGrupoTecnicoComponent } from './formulario-desabilitar-grupo-tecnico.component';

describe('FormularioDesabilitarGrupoTecnicoComponent', () => {
  let component: FormularioDesabilitarGrupoTecnicoComponent;
  let fixture: ComponentFixture<FormularioDesabilitarGrupoTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDesabilitarGrupoTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDesabilitarGrupoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
