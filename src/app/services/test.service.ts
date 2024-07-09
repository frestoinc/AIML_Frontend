// Import Angular core and HTTP client modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Assume `ip` and `port` are defined in a `config` file
import { protocol, ip, port } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) {}

  testConnection(): Observable<any> {
    return this.httpClient.get(`${protocol}://${ip}:${port}/api/test/get-hello`);
  }
}
