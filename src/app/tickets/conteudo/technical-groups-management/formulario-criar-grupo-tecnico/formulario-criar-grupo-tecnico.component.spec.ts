import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCriarGrupoTecnicoComponent } from './formulario-criar-grupo-tecnico.component';

describe('FormularioCriarGrupoTecnicoComponent', () => {
  let component: FormularioCriarGrupoTecnicoComponent;
  let fixture: ComponentFixture<FormularioCriarGrupoTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCriarGrupoTecnicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCriarGrupoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
