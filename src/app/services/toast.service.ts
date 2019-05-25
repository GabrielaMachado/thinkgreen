import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/@angular/fire/database';
//import { AngularFireDataBase, FirebaseListObservable } from '@angular/fire/database';

export class Message{
    content: string;
    style: string;
    dismissed: boolean = false;

    constructor(content, style?){
        this.content = content
        this.style = style || 'info'
    }
}

@Injectable()
export class ToastService{
    constructor(private db: AngularFireDatabase){}

    //getMessages(): 
}