import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Mensaje } from "../interface/mensaje.interface";
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
import * as firebase from 'firebase/app';
//import { Observable } from '../../../node_modules/rxjs';

//export interface Cliente {nombre:string}
//export interface Cliente {cedula:string}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  //private clientesCollection: AngularFirestoreCollection<Cliente>;
  //cliente: Observable<Cliente[]>
  //clientes:any;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) { 
    //this.clientesCollection = afs.collection<Cliente>('clientes');
    //this.cliente= this.clientesCollection.valueChanges();
    //this.clientes.subscribe(cliente=>{
      //this.clientes = cliente;
    //})
    this.afAuth.authState.subscribe(user =>{
      console.log('Estado del usuario ', user);
      if(!user){
        //console.log('este es el nombreee ',this.clientes.nombre);
        return;
        //this.usuario.nombre = this.clientes.nombre;
        //this.usuario.uid = this.clientes.cedula;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  login( proveedor: string ) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
      .limit(5));
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for(let mensaje of mensajes){
          this.chats.unshift(mensaje);
        }  
        return this.chats;
      }
      ))

  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add(mensaje);
  }
}
