import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesTicketComponent } from './acoes-ticket.component';

describe('AcoesTicketComponent', () => {
  let component: AcoesTicketComponent;
  let fixture: ComponentFixture<AcoesTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcoesTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcoesTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
