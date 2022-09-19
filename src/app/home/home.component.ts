import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  books: Book[] = [];

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.get('books').subscribe((books: Book[]) => {
      this.books = books;
    });
  }
  authenticated(): boolean {
    return this.authService.authenticated();
  }
}
