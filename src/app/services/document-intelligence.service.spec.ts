import { TestBed } from '@angular/core/testing';

import { DocumentIntelligenceService } from './document-intelligence.service';

describe('DocumentIntelligenceService', () => {
  let service: DocumentIntelligenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentIntelligenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
