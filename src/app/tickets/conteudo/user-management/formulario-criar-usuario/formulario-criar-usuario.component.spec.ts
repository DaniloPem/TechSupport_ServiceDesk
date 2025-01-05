import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCriarUsuarioComponent } from './formulario-criar-usuario.component';

describe('FormularioCriarUsuarioComponent', () => {
  let component: FormularioCriarUsuarioComponent;
  let fixture: ComponentFixture<FormularioCriarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCriarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCriarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
