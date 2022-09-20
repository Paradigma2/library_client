import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { User } from '../models/user';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  passwordCheck: string;
  firstName: string;
  lastName: string;
  profilePicture: File;

  alertClosed = true;
  alertMessage: string;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {}

  register(): void {
    if (this.check()) {
      let photoId = 1;
      if (this.profilePicture) {
        const formDataPhoto = new FormData();
        formDataPhoto.append('profilePicture', this.profilePicture);

        const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
        this.httpService.post('photos', formDataPhoto, headers).subscribe((photo: Photo) => {
          if (photo) { photoId = photo.id; }
        }, (err) => {
          this.alertMessage = 'Doslo je do greske';
          this.alertClosed = false;
        });
      }

      const formDataUser = new FormData();
      formDataUser.append('username', this.username);
      formDataUser.append('email', this.email);
      formDataUser.append('password', this.password);
      formDataUser.append('address', this.address);
      formDataUser.append('firstName', this.firstName);
      formDataUser.append('lastName', this.lastName);
      formDataUser.append('photoId', photoId.toString());

      this.httpService.post('users', formDataUser).subscribe((user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['home']);
        } else {
          this.alertMessage = 'Doslo je do greske';
          this.alertClosed = false;
        }
      }, (err) => {
        this.alertMessage = 'Doslo je do greske';
        this.alertClosed = false;
      });
    }
  }

  onFileSelected(event): void {
    this.profilePicture = (event.target as HTMLInputElement).files[0];
  }

  check(): boolean {
    if (!this.username) {
      this.alertMessage = 'Morate uneti korisnicko ime!';
      this.alertClosed = false;
      return false;
    }
    if (!this.email) {
      this.alertMessage = 'Morate uneti email!';
      this.alertClosed = false;
      return false;
    }

    const regExp = /(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])([A-Za-z]{1})[A-Za-z\d$@$!%*?&#]{7,11}/g;
    console.log(regExp.test(this.password));
    if (!regExp.test(this.password)) {
      this.alertMessage = 'Sifra mora imati najmanje 8, a najvise 12 karaktera. Mora sadrzati bar jedno malo i veliko slovo, bar jednu cifru i jedan specijalan karakter!';
      this.alertClosed = false;
      return false; // change to false to enable
    }
    if (this.password !== this.passwordCheck) {
      this.alertMessage = 'Sifre se ne podudaraju!';
      this.alertClosed = false;
      return false;
    }
    return true;
  }
}
