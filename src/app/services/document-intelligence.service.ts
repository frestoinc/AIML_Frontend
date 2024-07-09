import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { protocol, ip, port } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class DocumentIntelligenceService {

  constructor(private httpClient: HttpClient) {}

  uploadDocument(formData: FormData): Observable<any> {
    return this.httpClient.post(`${protocol}://${ip}:${port}/api/document-intelligence/upload-document`, formData);
  }
}
