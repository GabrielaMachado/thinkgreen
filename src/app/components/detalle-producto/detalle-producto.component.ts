import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { BolsitaService } from "./../../services/servicioBolsita/bolsita.service";
import { ProductosInterface } from "../../models/productos";
import { retry } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: "app-detalle-producto",
  templateUrl: "./detalle-producto.component.html",
  styleUrls: ["./detalle-producto.component.sass"]
})
export class DetalleProductoComponent implements OnInit {
  constructor(
    private authservicio: AuthService,
    private api: ApiService,
    private servicio: BolsitaService
  ) {}

  filterProductos = '';
  productos: ProductosInterface[];
  editState: boolean = false;
  productoToEdit: ProductosInterface;
  productoEncontrado: ProductosInterface;

  
  ngOnInit() {
    this.api.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  clearState() {
    this.editState = false;
    this.productoToEdit = null;
  }

  editProduct(event, producto: ProductosInterface) {
    this.editState = true;
    this.productoToEdit = producto;
  }

  onModificarProducto(producto: ProductosInterface) {
    this.api.updateProductos(producto);
    this.clearState();
  }

  AnadirBolsita(item) {
    //let data = form.value
    this.servicio.agregarBolsita(item);
    //this.afs.collection('productos').add(data)
  }

  eliminarProducto(event, producto: ProductosInterface) {
    this.api.delateProductos(producto);
    this.clearState();
  }

  filtrarProducto(){
    alert('holaaa');
    console.log('holaa');
  }

<<<<<<< HEAD
  public validarAdmin(){
    if(this.authservicio.isLoggedIn){
      if(this.authservicio.user.email == "gabrielamachadopr@gmail.com"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
=======
  buscar(id: string){
    for(let product of this.productos){
      if (product.id == id) {
        this.productoEncontrado = product;
      }
>>>>>>> d11fc1378b8665624b3d313f3f20581ce8d1b2db
    }
  }
}
