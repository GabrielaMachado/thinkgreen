import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map, catchError, retry } from "rxjs/operators";
import { AuthService } from "./auth.service";
//import { Mensaje } from "../interface/mensaje.interface";
//import { Chat } from "../interface/chat.interface";
import { AngularFireAuth } from "../../../node_modules/@angular/fire/auth";
import * as firebase from "firebase/app";
import { UUID } from "angular2-uuid";
import { isNullOrUndefined } from "util";
import { Mensaje_publicacion } from '../interface/mensaje-publicacion.interface';
import { Chat_publicacion } from '../interface/chat-publicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatPublicacionService {

  private itemsCollection: AngularFirestoreCollection<Mensaje_publicacion>;
  private chatCollection: AngularFirestoreCollection<Chat_publicacion>;
  //private clientesCollection: AngularFirestoreCollection<Cliente>;
  //cliente: Observable<Cliente[]>
  //clientes:any;
  public mensaje_publicacion: Mensaje_publicacion[] = [];
  public usuario_publicacion: any = {};
  public chat_publicacion: Chat_publicacion[] = [];

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log("Estado del usuario ", user);
      if (!user) {
        //console.log('este es el nombreee ',this.clientes.nombre);
        return;
        //this.usuario.nombre = this.clientes.nombre;
        //this.usuario.uid = this.clientes.cedula;
      }
      this.usuario_publicacion.nombre = user.displayName;
      this.usuario_publicacion.uid = user.uid;
    });
   }

   login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    this.usuario_publicacion = null;
  }

  cargarMensajes_publicacion() {
    if (isNullOrUndefined(localStorage.getItem("user"))) {
      this.mensaje_publicacion = [];
      return;
    }

    var idChat_publicacion = "";
    var chat_publicacioncol = this.afs.collection<Chat_publicacion>("chat_publicacion");
    return chat_publicacioncol.valueChanges().subscribe((chats_publicacion: Chat_publicacion[]) => {
      console.log(chats_publicacion);
      for (let chat_publicacion of chats_publicacion) {
        if (chat_publicacion.userId_publicacion == this.usuario_publicacion.uid) {
          idChat_publicacion = chat_publicacion.chat_publicacionId;
        }
      }
      console.log("chat publicación ", idChat_publicacion);
      if (idChat_publicacion != "") {
        this.itemsCollection = this.afs.collection<Mensaje_publicacion>("mensaje_publicacion", ref =>
          ref.orderBy("fecha", "desc").limit(5)
        );
        return this.itemsCollection
          .valueChanges()
          .pipe(
            map((mensajes_publicacion: Mensaje_publicacion[]) => {
              //console.log(mensajes);
              this.mensaje_publicacion = [];
              for (let mensaje_publicacion of mensajes_publicacion) {
                if (mensaje_publicacion.chat_publicacionId == idChat_publicacion) {
                  this.mensaje_publicacion.unshift(mensaje_publicacion);
                }
              }
              return this.mensaje_publicacion;
            })
          )
          .subscribe(() => {
            console.log("yupi");
          });
      }
    });
  }

  agregarMensaje_publicacion(texto: string) {
    var chatsUsuario_publicacion = false;
    var idChat_publicacion;
    this.itemsCollection = this.itemsCollection = this.afs.collection<Mensaje_publicacion>("mensaje_publicacion");
    this.chatCollection = this.afs.collection<Chat_publicacion>("chat_publicacion");
    return this.chatCollection.valueChanges().subscribe((chats_publicacion: Chat_publicacion[]) => {
      for (let chat_publicacion of chats_publicacion) {
        if (chat_publicacion.userId_publicacion == this.usuario_publicacion.uid) {
          chatsUsuario_publicacion = true;
          idChat_publicacion = chat_publicacion.chat_publicacionId;
        }
      }
      if (!chatsUsuario_publicacion) {
        let newChat_publicacion: Chat_publicacion = {
          chat_publicacionId: UUID.UUID(),
          nombreUsuario_publicacion: this.usuario_publicacion.nombre,
          userId_publicacion: this.usuario_publicacion.uid
        };
        idChat_publicacion = newChat_publicacion.chat_publicacionId;
        this.chatCollection.add(newChat_publicacion);
      }
      let mensaje_publicacion: Mensaje_publicacion = {
        nombre_publicacion: this.usuario_publicacion.nombre,
        chat_publicacionId: idChat_publicacion,
        mensaje_publicacion: texto,
        fecha: new Date().getTime(),
        enviadoAdmin_publicacion: false
      };
      return this.itemsCollection.add(mensaje_publicacion);
    });
    texto = "";
  }
}

