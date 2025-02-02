import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarGrupoTecnicoComponent } from './formulario-editar-grupo-tecnico.component';

describe('FormularioEditarGrupoTecnicoComponent', () => {
  let component: FormularioEditarGrupoTecnicoComponent;
  let fixture: ComponentFixture<FormularioEditarGrupoTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEditarGrupoTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEditarGrupoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
