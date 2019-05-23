import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.sass']
})
export class NotificacionComponent implements OnInit {
  mensaje: string = 'barra de notificaciones'
  constructor() { }

  ngOnInit() {
  }

}
