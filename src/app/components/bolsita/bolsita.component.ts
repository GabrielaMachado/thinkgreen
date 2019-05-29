import { Component, OnInit } from "@angular/core";
import { BolsitaService } from "./../../services/servicioBolsita/bolsita.service";
import { ApiService } from "./../../services/api.service";
import { ProductosInterface } from "./../../models/productos";

@Component({
  selector: "app-bolsita",
  templateUrl: "./bolsita.component.html",
  styleUrls: ["./bolsita.component.sass"]
})
export class BolsitaComponent implements OnInit {
  constructor(private api: ApiService, private servicio: BolsitaService) {}

  bolsita: ProductosInterface[];

  ngOnInit() {
    this.bolsita = this.servicio.bolsita;
    // this.servicio.getContenido().push(bolsita => {
    //   this.bolsita = bolsita;
    // });
    //   this.bolsita.get .subscribe(productos => {
    //    this.productos = productos;
    // });
  }
  calcularTotal() {
    //let data = form.value
    return this.servicio.calcularTotal();
    //this.afs.collection('productos').add(data)
  }
  AnadirBolsita(item) {
    //let data = form.value
    this.servicio.agregarBolsita(item);
    //this.afs.collection('productos').add(data)
  }

  borrarItemCarrito(item) {
    this.servicio.borrarItemCarrito(item);
  }
}
