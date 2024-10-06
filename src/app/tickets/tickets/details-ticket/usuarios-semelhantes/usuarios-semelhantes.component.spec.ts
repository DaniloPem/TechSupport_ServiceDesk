import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSemelhantesComponent } from './usuarios-semelhantes.component';

describe('UsuariosSemelhantesComponent', () => {
  let component: UsuariosSemelhantesComponent;
  let fixture: ComponentFixture<UsuariosSemelhantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosSemelhantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosSemelhantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
