import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsTicketComponent } from './attachments-ticket.component';

describe('AttachmentsTicketComponent', () => {
  let component: AttachmentsTicketComponent;
  let fixture: ComponentFixture<AttachmentsTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentsTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
