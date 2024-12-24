import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTicketsComponent } from './tabela-tickets.component';

describe('TabelaTicketsComponent', () => {
  let component: TabelaTicketsComponent;
  let fixture: ComponentFixture<TabelaTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
