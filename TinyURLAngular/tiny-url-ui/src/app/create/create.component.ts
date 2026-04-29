import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  url = '';
  isPrivate = false;
  searchText = '';
  urls: any[] = [];

  private baseUrl = 'https://localhost:7153';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

errorMessage = '';

generate() {

  // Reset error
  this.errorMessage = '';

  // Validation
  if (!this.url) {
    this.errorMessage = 'Please enter a URL';
    return;
  }

  if (!this.isValidUrl(this.url)) {
    this.errorMessage = 'Please enter a valid URL (must start with http:// or https://)';
    return;
  }

  // API call
  this.http.post(`${this.baseUrl}/api/add`, {
    originalUrl: this.url,
    isPrivate: this.isPrivate
  }).subscribe(() => {
    this.url = '';
    this.isPrivate = false;
    this.load();
  });
}

// URL validation
isValidUrl(url: string): boolean {
  return /^https?:\/\/.+/i.test(url);
}

  // 🔹 Load URLs
  load() {
    this.http.get<any[]>(`${this.baseUrl}/api/public`)
      .subscribe(res => {
        this.urls = res;
      });
  }

  // 🔹 Delete URL
  delete(code: string) {
    this.http.delete(`${this.baseUrl}/api/delete/${code}`)
      .subscribe(() => this.load());
  }

  // 🔹 Copy URL
  copy(code: string) {
    const shortUrl = `${this.baseUrl}/r/${code}`;
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  }

  // 🔹 Filter URLs
  filteredUrls() {
    if (!this.searchText) return this.urls;

    return this.urls.filter(x =>
      x.originalUrl.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}