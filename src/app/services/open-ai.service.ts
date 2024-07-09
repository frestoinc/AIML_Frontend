import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { protocol, ip, port } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  
  constructor(private httpClient: HttpClient) {}

  sendPrompt(formData: FormData): Observable<any> {
    return this.httpClient.post(`${protocol}://${ip}:${port}/api/openai/send-prompt`, formData);
  }
}
