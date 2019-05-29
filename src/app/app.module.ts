import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { ListadoProductosComponent } from './components/admin/listado-productos/listado-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { Page404Component } from './components/errors/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { AuthService } from './services/auth.service';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { ChatComponent } from './components/chat/chat.component';

//servicios
import { ChatService } from "./services/chat.service";
import { ApiService } from './services/api.service';
import { AsesoriasComponent } from './components/asesorias/asesorias.component';
import { BolsitaComponent } from './components/bolsita/bolsita.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ComponentsComponent } from './chat_component/components/components.component';
import { ChatPublicacionComponent } from './components/chat-publicacion/chat-publicacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DetalleProductoComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    ListadoProductosComponent,
    GestionProductosComponent,
    ChatComponent,
    AsesoriasComponent,
    BolsitaComponent,
    NotificacionComponent,
    FilterPipe,
    ComponentsComponent,
    ChatPublicacionComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [ApiService,AuthService, AngularFirestore, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
