import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiendaOnline';
  public chats: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.chats = db.collection('chats').valueChanges();
  }
}
