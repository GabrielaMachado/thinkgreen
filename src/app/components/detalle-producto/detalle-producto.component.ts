import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.sass']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private authservicio : AuthService , private api: ApiService) { }

  public productos = []
  public producto =  ''

  ngOnInit() {
    this.api.getProductos().subscribe(productos=>{
      console.log('PRODUCTOS', productos);
      this.productos = productos;
    })
  }

}
