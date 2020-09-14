import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  names: string[];
  newDoc =
    new Date().getDate() +
    '.' +
    new Date().getMonth() +
    '.' +
    new Date().getFullYear();
  data: { [name: string]: boolean };
  constructor(private db: AngularFirestore, private snacknbar: MatSnackBar) {}

  ngOnInit(): void {
    this.db
      .collection('names')
      .doc('names')
      .valueChanges()
      .pipe(take(1))
      .subscribe((names: {}) => {
        this.names = Object.values(names);
        console.log(this.names);
      });
  }

  anwesend(name: string, state: boolean) {
    this.data = { ...this.data, [name]: state };
    console.log(this.data);
    if (this.names[this.names.length - 1] === name) {
      this.db
        .collection('anwesend')
        .doc(this.newDoc)
        .set(this.data)
        .then(() => {
          console.log('Updated!');
          this.snacknbar.open('Updated!', 'ok', {
            duration: 4000,
            panelClass: ['successSnackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        });
    }
    this.names.shift();
  }
}
