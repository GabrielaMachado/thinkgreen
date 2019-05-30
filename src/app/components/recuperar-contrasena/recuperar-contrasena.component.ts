import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.sass']
})
export class RecuperarContrasenaComponent implements OnInit {

  email = '';

  constructor(private auth: AuthService,private router: Router
  ) { }

  ngOnInit() {
  }
  resetPassword() {
    this.auth.resetPassword(this.email);
    alert('revisa la bandeja de entrada del correo electronico');
    this.router.navigate(["Login"]);

    
  }
}
