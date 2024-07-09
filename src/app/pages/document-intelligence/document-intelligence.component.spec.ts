import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIntelligenceComponent } from './document-intelligence.component';

describe('DocumentIntelligenceComponent', () => {
  let component: DocumentIntelligenceComponent;
  let fixture: ComponentFixture<DocumentIntelligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentIntelligenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
