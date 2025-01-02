import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaManagementComponent } from './categoria-management.component';

describe('CategoriaManagementComponent', () => {
  let component: CategoriaManagementComponent;
  let fixture: ComponentFixture<CategoriaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
