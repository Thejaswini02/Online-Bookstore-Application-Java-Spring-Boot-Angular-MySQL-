import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = new Book();

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  createBook() {
    this.bookService.createBook(this.newBook).subscribe(data => {
      this.books.push(data);
      this.newBook = new Book();
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
}
