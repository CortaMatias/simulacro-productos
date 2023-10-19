import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TablaPaisesComponent } from './components/tabla-paises/tabla-paises.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { InfoProductoComponent } from './components/info-producto/info-producto.component';
import { DetallePaisesComponent } from './components/detalle-paises/detalle-paises.component';
import { ContainerComponent } from './components/container/container.component';
import { AltaContainerComponent } from './components/alta-container/alta-container.component';
import { ModificarContainerComponent } from './components/modificar-container/modificar-container.component';
import { BorrarContainerComponent } from './components/borrar-container/borrar-container.component';
import { TablaContainerComponent } from './components/tabla-container/tabla-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BienvenidaComponent,
    NavbarComponent,
    TablaPaisesComponent,
    AltaProductoComponent,
    TablaProductoComponent,
    DetalleProductoComponent,
    InfoProductoComponent,
    DetallePaisesComponent,
    ContainerComponent,
    AltaContainerComponent,
    ModificarContainerComponent,
    BorrarContainerComponent,
    TablaContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
