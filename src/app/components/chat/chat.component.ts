import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { Alert } from '../../../../node_modules/@types/selenium-webdriver';
import { Chat } from '../../interface/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  mensaje: string = "";
  elemento: any;
  chatsUsuaros: Chat[];

  constructor(public _cs: ChatService,private api: AuthService) {
    this._cs.cargarMensajes();
    this.cargarChats();
    // .subscribe( () =>{
    //   setTimeout(()=>{
    //     this.elemento.scrollTop = this.elemento.scrollHeight;
    //   },20);
    // });
   }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length === 0){
      return;
    }
    this._cs.agregarMensaje(this.mensaje);
    this.mensaje="";
    // .then(() => this.mensaje = "")
    // .catch((err) => console.error('Error al enviar', err));
  }  

  errorAuth(){
    if (this.api.isLoggedIn) {
      this.enviar_mensaje();
    }else{
      alert('Debes Registrarte para poder hacer uso de nuestras asesorias');
    }
  }

  cargarChats(){
    this._cs.obtenerChats().subscribe((chat: Chat[]) =>{
      console.log('sdfghj ',chat);
      this.chatsUsuaros = chat;
    });
  }
}
