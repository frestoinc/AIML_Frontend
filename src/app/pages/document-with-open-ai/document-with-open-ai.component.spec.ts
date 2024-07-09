import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentWithOpenAIComponent } from './document-with-open-ai.component';

describe('DocumentWithOpenAIComponent', () => {
  let component: DocumentWithOpenAIComponent;
  let fixture: ComponentFixture<DocumentWithOpenAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentWithOpenAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentWithOpenAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
