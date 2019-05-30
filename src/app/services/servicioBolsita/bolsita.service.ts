import { Injectable } from "@angular/core";
import { ApiService } from "./../api.service";
import { Observable } from "../../../../node_modules/rxjs";
import { ProductosInterface } from "../../models/productos";
import { Bolsita } from "../../models/Bolsita";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { UUID } from "angular2-uuid";

@Injectable({
  providedIn: "root"
})
export class BolsitaService {
  private productosCollection: AngularFirestoreCollection<ProductosInterface>;
  public bolsitaCollection: AngularFirestoreCollection<Bolsita>;

  private bolsitaDoc: AngularFirestoreDocument<Bolsita>;

  public bolsita = this.bolsitaCollection.doc("producto");
  public usuario: any = {};
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.bolsitaCollection = this.afs.collection<Bolsita>("bolsita");
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.usuario.uid = user.uid;
    });
  }

  agregarBolsita(item) {
    // var bolsitaUsuario = false;
    let newBolsita: Bolsita = {
      usuario: this.usuario.uid,
      producto: item,
      total: item.precio
    };
    console.log("New producto");
    this.bolsitaCollection.add(newBolsita);
  }

  getContenido() {
    return this.bolsitaCollection;
  }

  calcularTotal() {
    let total: number = 0;
    let precio: number = 0;
    for (let producto of this.bolsita) {
      total = producto.precio + total;
    }
    return total;
  }

  borrarItemCarrito(item) {
    for (let producto of this.bolsita) {
      if (producto.id == item.id) {
      }
    }
    this.bolsitaDoc = this.afs.doc(`bolsita/${item.id}`);
    this.bolsitaDoc.delete();
    let posicion = this.bolsita.indexOf(item);
    this.bolsita.splice(posicion, 1);
    this.calcularTotal();
  }

  buscarbolsita(producto) {}

  delateProductos(bolsita: Bolsita) {}

  actualizar() {
    let numero: number = 0;
    numero = this.bolsita.length;
    return numero;
  }
}

/*agregarBolsita(item) {
  var bolsitaUsuario = false;
  var idBolsita;
  this.bolsitaCollection = this.afs.collection<Bolsita>("bolsita");
  this.bolsitaCollection.valueChanges().subscribe((bolsitas: Bolsita[]) => {
    for (let bolsita of bolsitas) {
      if (bolsita.usuario == this.usuario.uid) {
        bolsitaUsuario = true;
        idBolsita = bolsita.id_bolsita;
        let newBolsita: Bolsita = {
          id_bolsita: idBolsita,
          usuario: bolsita.usuario,
          producto: item,
          total: item.precio
          
          this.bolsitaCollection.add(newBolsita);
        }
      }
      if (!bolsitaUsuario) {
        let newBolsita: Bolsita = {
          id_bolsita: UUID.UUID(),
          usuario: this.usuario.uid,
          producto: item,
          total: item.precio
        };
        idBolsita = newBolsita.id_bolsita;
        this.bolsitaCollection.add(newBolsita);
      }
      this.bolsita.push(item);
      //this.bolsitaCollection.add(item);
    });
} */
