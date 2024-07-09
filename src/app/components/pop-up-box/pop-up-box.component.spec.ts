import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpBoxComponent } from './pop-up-box.component';

describe('PopUpBoxComponent', () => {
  let component: PopUpBoxComponent;
  let fixture: ComponentFixture<PopUpBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
