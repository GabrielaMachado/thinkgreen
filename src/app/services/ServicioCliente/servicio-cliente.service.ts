import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from './../../models/Cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioClienteService {
  private clienteCollections: AngularFirestoreCollection<Cliente>
  private clientes: Observable<Cliente[]>
  private clienteDoc: AngularFirestoreDocument<Cliente>;

  constructor(private afs: AngularFirestore) {
    this.clienteCollections = afs.collection<Cliente>('clientes');
    //this.productos = this.productsCollection.valueChanges()
    this.clientes = this.clienteCollections.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getClientes() {
    return this.clientes;
  }

  addCliente(cliente: Cliente) {
    console.log('New producto');
    this.clienteCollections.add(cliente);
  }

  delateClientes(cliente: Cliente) {
    this.clienteDoc = this.afs.doc(`productos/${cliente.id}`);
    this.clienteDoc.delete();
  }
  updateClientes(cliente: Cliente) {
    this.clienteDoc = this.afs.doc(`productos/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }
}
