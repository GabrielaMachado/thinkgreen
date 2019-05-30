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
import { map } from "rxjs/operators";
import { LineToLineMappedSource } from "webpack-sources";

@Injectable({
  providedIn: "root"
})
export class BolsitaService {
  private productosCollection: AngularFirestoreCollection<ProductosInterface>;
  public bolsitaCollection: AngularFirestoreCollection<Bolsita>;

  private bolsitaDoc: AngularFirestoreDocument<Bolsita>;

  public bolsita = [];
  public bolsita2: Observable<Bolsita[]>;
  public usuario: any = {};
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.bolsitaCollection = this.afs.collection<Bolsita>("bolsita");
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.usuario.uid = user.uid;
    });
    this.bolsita2 = this.bolsitaCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Bolsita;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  llenarBolsita() {
    this.bolsitaCollection = this.afs.collection<Bolsita>("bolsita");
    this.bolsitaCollection
      .valueChanges()
      .pipe(
        map((bolsitas: Bolsita[]) => {
          //  console.log(bolsitas);
          for (let bolsita of bolsitas) {
            //   console.log(this.bolsita);
            this.bolsita.push(bolsita.producto);
          }
        })
      )
      .subscribe(() => {
        console.log("no se");
      });
  }

  agregarBolsita(item) {
    // var bolsitaUsuario = false;
    let newBolsita: Bolsita = {
      usuario: this.usuario.uid,
      producto: item,
      total: item.precio
    };
    this.bolsitaCollection.add(newBolsita);
    //this.llenarBolsita();
    // console.log(this.bolsitaCollection);
  }

  getContenido() {
    return this.bolsita2;
  }

  calcularTotal() {
    let total: number = 0;
    let precio: number = 0;
    for (let producto of this.bolsita) {
      total = producto.precio + total;
    }
    return total;
  }

  borrarItemCarrito(item, bolsita2) {
    for (let bolsita of bolsita2) {
      if (bolsita.producto.id == item.id) {
        this.bolsitaDoc = this.afs.doc(`bolsita/${bolsita.id}`);
        this.bolsitaDoc.delete();
        //   console.log(producto.id);
      }
    }

    //let posicion = this.bolsita.indexOf(item);
    //this.bolsita.splice(posicion, 1);
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
