import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ApiService } from './../../services/api.service';
import { ProductosInterface } from './../../models/productos'


@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.sass']
})
export class GestionProductosComponent implements OnInit {

  producto: ProductosInterface = {
    producto: '',
    precio:0,
    imagen_url:''
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

 

  CrearProducto(formNew: NgForm){
    //let data = form.value
    console.log(formNew);
    this.api.addProductos(this.producto);
    //this.afs.collection('productos').add(data)
    alert('Se creo correctamente')
  }

 



}
