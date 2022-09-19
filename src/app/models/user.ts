import {Photo} from './photo';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  role: string;
  status: string;
  photo: Photo;
}
