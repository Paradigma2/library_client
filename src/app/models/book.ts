import { Genre } from './genre';
import { Photo } from './photo';

export interface Book{
  id: number;
  title: string;
  publisher: string;
  year: number;
  language: string;
  authors: string;
  status: string;
  photo: Photo;
  genres: Genre[];
}
