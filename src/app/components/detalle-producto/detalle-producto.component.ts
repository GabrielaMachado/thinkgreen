import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { BolsitaService } from './../../services/servicioBolsita/bolsita.service';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.sass']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private authservicio : AuthService , private api: ApiService, private bolsita : BolsitaService) { }

  public productos = []
  public producto =  ''

  ngOnInit() {
    this.api.getProductos().subscribe(productos=>{
      console.log('PRODUCTOS', productos);
      this.productos = productos;
    })
  }

  AnadirBolsita(){
    //let data = form.value
    this.bolsita.anyadirCarrito();
    //this.afs.collection('productos').add(data)
  
  }

}
