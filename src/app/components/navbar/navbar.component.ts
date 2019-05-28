import { Component, OnInit } from "@angular/core";
import { BolsitaService } from "./../../services/servicioBolsita/bolsita.service";

import { ProductosInterface } from "./../../models/productos";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {
  constructor(private servicio: BolsitaService) {}

  bolsita: ProductosInterface[];

  ngOnInit() {
    this.bolsita = this.servicio.bolsita;
  }

  actualizarBolsita() {
    let numero = this.servicio.actualizar();
    if (numero != 0) {
      return this.servicio.actualizar();
    } else {
      this.servicio.actualizar();
    }

    //console.log(this.servicio.actualizar());
  }
}
