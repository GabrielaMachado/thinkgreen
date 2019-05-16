import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProductosInterface } from '../models/productos';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private productsCollection: AngularFirestoreCollection<ProductosInterface>
  private productos: Observable<ProductosInterface[]>

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection<ProductosInterface>('productos');
    //this.productos = this.productsCollection.valueChanges()
    this.productos = this.productsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ProductosInterface;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getProductos() {
    return this.productos;
  }

  addProductos(producto : ProductosInterface) {
    console.log('New producto');
    this.productsCollection.add(producto);
  }

  delateProductos() {
    console.log('Delate producto');
  }
  updateProductos() {
    console.log('Update producto');
  }
}
