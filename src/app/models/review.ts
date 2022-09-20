import { Book } from './book';
import { User } from './user';

export interface Review {
  comment: string;
  score: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  book: Book;
}
