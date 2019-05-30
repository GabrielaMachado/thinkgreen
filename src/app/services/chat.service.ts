import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map, catchError, retry } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Mensaje } from "../interface/mensaje.interface";
import { Chat } from "../interface/chat.interface";
import { AngularFireAuth } from "../../../node_modules/@angular/fire/auth";
import * as firebase from "firebase/app";
import { UUID } from "angular2-uuid";
import { isNullOrUndefined } from "util";
import { DetalleProductoComponent } from "./../components/detalle-producto/detalle-producto.component";
import { isNull } from '../../../node_modules/@angular/compiler/src/output/output_ast';
//import { Observable } from '../../../node_modules/rxjs';

//export interface Cliente {nombre:string}
//export interface Cliente {cedula:string}

@Injectable({
  providedIn: "root"
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  private chatCollection: AngularFirestoreCollection<Chat>;
  //private clientesCollection: AngularFirestoreCollection<Cliente>;
  //cliente: Observable<Cliente[]>
  //clientes:any;
  public mensaje: Mensaje[] = [];
  public usuario: any = {};
  public chat: Chat[] = [];
  public idChat: string = null;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private dp: DetalleProductoComponent) {
    //this.clientesCollection = afs.collection<Cliente>('clientes');
    //this.cliente= this.clientesCollection.valueChanges();
    //this.clientes.subscribe(cliente=>{
    //this.clientes = cliente;
    //})
    this.afAuth.authState.subscribe(user => {
      console.log("Estado del usuario ", user);
      if (!user) {
        //console.log('este es el nombreee ',this.clientes.nombre);
        return;
        //this.usuario.nombre = this.clientes.nombre;
        //this.usuario.uid = this.clientes.cedula;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    this.usuario = null;
  }

  cargarMensajes(usuarioId = null) {
    if (isNullOrUndefined(localStorage.getItem("user"))) {
      this.mensaje = [];
      return;
    }

    var idChat = "";
    var chatcol = this.afs.collection<Chat>("chats");
    return chatcol.valueChanges().subscribe((chats: Chat[]) => {
      console.log(chats);
      for (let chat of chats) {
        if(isNullOrUndefined(usuarioId)){
          if (chat.userId == this.usuario.uid) {
            idChat = chat.chatId;
          }
        } else {
          if (chat.userId == usuarioId) {
            idChat = chat.chatId;
          }
        }
      }
      console.log("chat peticion", idChat);
      if (idChat != "") {
        this.itemsCollection = this.afs.collection<Mensaje>("mensaje", ref => ref.orderBy('fecha', 'asc'));
        return this.itemsCollection
          .valueChanges()
          .pipe(
            map((mensajes: Mensaje[]) => {
              this.mensaje = [];
              for (let mensaje of mensajes) {
                if (mensaje.chatId == idChat) {
                  this.mensaje.unshift(mensaje);
                }
              }
              return this.mensaje;
            })
          )
          .subscribe(() => {
            console.log("yupi");
          });
      }
    });
  }

  setChatId(id: string){
    this.idChat = id;
  }

  agregarMensaje(texto: string) {
    var chatsUsuario = false;
    this.itemsCollection = this.itemsCollection = this.afs.collection<Mensaje>("mensaje");
    this.chatCollection = this.afs.collection<Chat>("chats");
    return this.chatCollection.valueChanges().subscribe((chats: Chat[]) => {
      if (isNullOrUndefined(this.idChat)) {
        for (let chat of chats) {
          if (chat.userId == this.usuario.uid) {
            chatsUsuario = true;
            this.idChat = chat.chatId;
          }
        }
        if (!chatsUsuario) {
          let newChat: Chat = {
            chatId: UUID.UUID(),
            nombreUsuario: this.usuario.nombre,
            userId: this.usuario.uid
          };
          this.idChat = newChat.chatId;
          this.chatCollection.add(newChat);
        }
      }

      let mensaje: Mensaje;
      if (this.dp.validarAdmin()) {
        mensaje = {
          nombre: 'Administrador',
          chatId: this.idChat,
          mensaje: texto,
          fecha: new Date().getTime(),
          enviadoAdmin: true
        }

      } else {
        mensaje = {
          nombre: this.usuario.nombre,
          chatId: this.idChat,
          mensaje: texto,
          fecha: new Date().getTime(),
          enviadoAdmin: false
        }
      }
      return this.itemsCollection.add(mensaje);
    });
  }

  obtenerChats(){
    var lista = this.afs.collection<Chat>("chats");
    return lista.valueChanges();
  }
}
