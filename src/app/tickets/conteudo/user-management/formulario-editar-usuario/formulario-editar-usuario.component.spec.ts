import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarUsuarioComponent } from './formulario-editar-usuario.component';

describe('FormularioEditarUsuarioComponent', () => {
  let component: FormularioEditarUsuarioComponent;
  let fixture: ComponentFixture<FormularioEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEditarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
