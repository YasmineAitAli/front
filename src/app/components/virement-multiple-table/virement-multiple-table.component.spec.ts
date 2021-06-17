import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementMultipleTableComponent } from './virement-multiple-table.component';

describe('VirementMultipleTableComponent', () => {
  let component: VirementMultipleTableComponent;
  let fixture: ComponentFixture<VirementMultipleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirementMultipleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementMultipleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
