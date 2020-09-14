import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {}
  save(input: string) {
    const mitglieder = input.split('\n');
    console.log(mitglieder);
    this.db
      .collection('names')
      .doc('names')
      .set({ ...mitglieder });
  }
}
