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

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    pathMatch: 'full' },
  { path: "Logo", component: LogoComponent },
  { path: "Home", component: HomeComponent },
  { path: "Navbar", component: NavbarComponent },
  { path: "Footer", component: FooterComponent },
  { path: "DetalleProducto", component: DetalleProductoComponent },
  //{ path: "ListaProductos", component: ListaProductosComponent },
  { path: "Login", component: LoginComponent },
  { path: "Register", component: RegisterComponent },
  { path: "Page404", component: Page404Component },
  { path: 'admin', component: ListadoProductosComponent},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
