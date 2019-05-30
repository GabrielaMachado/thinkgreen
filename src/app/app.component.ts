import { Component } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, throwError } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";

import { BolsitaService } from "./services/servicioBolsita/bolsita.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tiendaOnline";
  public chats: Observable<any[]>;
  constructor(db: AngularFirestore, private servicio: BolsitaService) {
    this.chats = db.collection("chats").valueChanges();
    this.servicio.llenarBolsita();
  }
}
