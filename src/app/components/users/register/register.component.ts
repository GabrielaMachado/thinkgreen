import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Cliente } from '../../../models/Cliente';
import { ServicioClienteService } from './../../../services/ServicioCliente/servicio-cliente.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private api:ServicioClienteService, private router:Router) { }

  cliente : Cliente = {
    nombre:'',
    email: '',
    password: '',
    cedula: '',
    telefono: '',
    edad: 0,
    direccion:'',
    pais:'',
    ciudad:'',
    tipo : true
  };

  ngOnInit() {
  }


  RegistrarCliente(formNew: NgForm){
    console.log(formNew);
    this.api.addCliente(this.cliente);
    this.auth.registrarUsuario(this.cliente.email,this.cliente.password).then((res) => {
      this.router.navigate(['DetalleProducto']);
    }).catch( err => console.log('err', err.message))
    alert('Se creo correctamente')
  }
}
