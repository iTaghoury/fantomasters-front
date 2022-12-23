import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolePageComponent } from './edit-role-page.component';

describe('EditRolePageComponent', () => {
  let component: EditRolePageComponent;
  let fixture: ComponentFixture<EditRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRolePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
