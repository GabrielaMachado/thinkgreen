import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Mensaje } from "../interface/mensaje.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    return this.itemsCollection.valueChanges()
    
  }
}
