import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from "./../../../services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService: AuthService, public _cs: ChatService) {
  }

  ingresar(proveedor: string){
    console.log(proveedor);
    this._cs.login(proveedor);
  }

  ngOnInit() {
  }
}
