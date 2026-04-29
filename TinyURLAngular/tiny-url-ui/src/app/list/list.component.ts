import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html'
})
export class ListComponent {

  urls: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:5000/api/public')
      .subscribe(res => {
        this.urls = res;
      });
  }

  delete(code: string) {
    this.http.delete('http://localhost:5000/api/delete/' + code)
      .subscribe(() => this.load());
  }

  copy(code: string) {
    navigator.clipboard.writeText('http://localhost:5000/r/' + code);
  }
}