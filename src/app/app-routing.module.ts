import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListadoProductosComponent } from './components/admin/listado-productos/listado-productos.component';
import { DetalleProductoComponent } from "./components/detalle-producto/detalle-producto.component";
import { Page404Component } from "./components/errors/page404/page404.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { LogoComponent } from "./components/logo/logo.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
//import { ListaProductosComponent } from "./components/admin/lista-productos/lista-productos.component";
import { LoginComponent } from "./components/users/login/login.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { GestionProductosComponent } from "./components/gestion-productos/gestion-productos.component";
import { AsesoriasComponent } from "./components/asesorias/asesorias.component";
import { BolsitaComponent } from "./components/bolsita/bolsita.component";
import { ChatComponent } from './components/chat/chat.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
  { path: '',
    component: DetalleProductoComponent,
    pathMatch: 'full' },
  { path: "RecuperarContrasena", component: RecuperarContrasenaComponent},
  { path: "Logo", component: LogoComponent },
  { path: "Home", component: DetalleProductoComponent },
  { path: "Navbar", component: NavbarComponent },
  { path: "Footer", component: FooterComponent },
  { path: "DetalleProducto", component: DetalleProductoComponent },
  //{ path: "ListaProductos", component: ListaProductosComponent },
  { path: "Login", component: LoginComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Page404", component: Page404Component },
  { path: 'admin', component: ListadoProductosComponent},
  { path: 'Asesorias', component: AsesoriasComponent},
  { path: 'Bolsita', component: BolsitaComponent},
  { path: 'Chat', component: ChatComponent},
  { path: 'DetalleProducto/GestionProductos', component: GestionProductosComponent},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
