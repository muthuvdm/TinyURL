import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ApiService {
  baseUrl = 'https://localhost:7153/';

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