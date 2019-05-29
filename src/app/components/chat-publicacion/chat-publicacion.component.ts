import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatPublicacionService } from "../../services/chat-publicacion.service";
import { Alert } from '../../../../node_modules/@types/selenium-webdriver';

@Component({
  selector: 'app-chat-publicacion',
  templateUrl: './chat-publicacion.component.html',
  styleUrls: ['./chat-publicacion.component.scss']
})
export class ChatPublicacionComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor(public _csp: ChatPublicacionService ,private api: AuthService) {
    this._csp.cargarMensajes_publicacion();
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length === 0){
      return;
    }
    //this._csp.agregarMensaje_publicacion(this.mensaje);
    this.mensaje="";
    // .then(() => this.mensaje = "")
    // .catch((err) => console.error('Error al enviar', err));
  }  

  errorAuth(){
    if (this.api.isLoggedIn) {
      this.enviar_mensaje();
    }else{
      alert('Debes Registrarte para poder hacer una petición');
    }
  }

}
