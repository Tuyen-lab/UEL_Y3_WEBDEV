import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookdetailComponent } from './lookdetail.component';

describe('LookdetailComponent', () => {
  let component: LookdetailComponent;
  let fixture: ComponentFixture<LookdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
