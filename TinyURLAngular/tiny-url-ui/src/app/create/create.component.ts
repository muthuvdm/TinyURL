import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html'
})
export class CreateComponent {
  url = '';
  isPrivate = false;

  constructor(private http: HttpClient) {}

  generate() {
    this.http.post('http://localhost:5000/api/url', {
      originalUrl: this.url,
      isPrivate: this.isPrivate
    }).subscribe(() => alert('Created'));
  }
}