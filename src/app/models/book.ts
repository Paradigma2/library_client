import { Genre } from './genre';
import { Photo } from './photo';

export interface Book{
  id: number;
  title: string;
  publisher: string;
  year: number;
  language: string;
  authors: string;
  stock: number;
  averageScore: number;
  photo: Photo;
  genres: Genre[];
}
