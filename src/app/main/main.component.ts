import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { Photo } from '../models/photo';
import { Book } from '../models/book';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User;
  searchQuery: string;
  books: Book[];
  filteredBooks: Book[];
  constructor(private authService: AuthService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.httpService.get('getUser').subscribe((user: User) => {
        this.user = user;
    });
  }
  search(): void {
    this.httpService.get('books').subscribe((books: Book[]) => {
        this.books = books;
        this.filteredBooks = this.books;
    });
    this.filteredBooks = this.filteredBooks.filter((book: Book) =>
      book.title.toLocaleLowerCase().includes(this.searchQuery));
  }
  authenticated(): boolean {
    return this.authService.authenticated();
  }
}
