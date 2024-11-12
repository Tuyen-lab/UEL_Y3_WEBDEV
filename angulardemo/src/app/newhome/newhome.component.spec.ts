import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhomeComponent } from './newhome.component';

describe('NewhomeComponent', () => {
  let component: NewhomeComponent;
  let fixture: ComponentFixture<NewhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
