import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../services/api.service';


@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.sass']
})
export class GestionProductosComponent implements OnInit {

  constructor(private api: ApiService, private afs: AngularFirestore) { }

  ngOnInit() {
  //this.resetForm()
  }

  /*resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm()
      this.api.formData = {
        producto: '',
        precio: null
      }
    }
  }*/

  CrearProducto(form: NgForm){
    let data = form.value
    this.afs.collection('productos').add(data)
    alert('Se creo correctamente')
  }

}
