import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalGroupsManagementComponent } from './technical-groups-management.component';

describe('TechnicalGroupsManagementComponent', () => {
  let component: TechnicalGroupsManagementComponent;
  let fixture: ComponentFixture<TechnicalGroupsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalGroupsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalGroupsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
