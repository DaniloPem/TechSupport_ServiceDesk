import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCodigoUsuarioDialogComponent } from './mostrar-codigo-usuario-dialog.component';

describe('MostrarCodigoUsuarioDialogComponent', () => {
  let component: MostrarCodigoUsuarioDialogComponent;
  let fixture: ComponentFixture<MostrarCodigoUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarCodigoUsuarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarCodigoUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
