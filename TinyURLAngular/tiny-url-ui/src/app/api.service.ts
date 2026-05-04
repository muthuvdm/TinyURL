import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'https://tinyurl-api-f6b3a0e6fzhrc9ap.southeastasia-01.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(`${this.baseUrl}/api/url`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/api/url`);
  }

  delete(code: string) {
    return this.http.delete(`${this.baseUrl}/api/url/${code}`);
  }
}