import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../interface/chat.interface';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.scss']
})
export class AsesoriasComponent implements OnInit {

  chatsUsuaros: Chat[];
  constructor(private _cs: ChatService, private dp: DetalleProductoComponent) { }

  ngOnInit() {
    this.cargarChats();
  }
  
  cargarChats(){
    this._cs.obtenerChats().subscribe((chat: Chat[]) =>{
      this.chatsUsuaros = chat;
    });
  }

  seleccionarUsuario(user){
    this._cs.cargarMensajes(user.userId);
    this._cs.setChatId(user.chatId);
  }

}
