import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { logGuard } from './guards/logueado-guard';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { ContainerComponent } from './components/container/container.component';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: "" , redirectTo : "home" , pathMatch : "full"},
  { path : "home" , component: HomeComponent , children : [
    { path : "bienvenido" , component : BienvenidaComponent},
    { path : "login" , component : LoginComponent},
    { path : "alta-producto" , component : AltaProductoComponent, canActivate: [logGuard]},
    { path : "detalle-producto" , component : DetalleProductoComponent , canActivate: [logGuard]},
    { path : "tabla-producto" , component : TablaProductoComponent },
    { path : "container" , component : ContainerComponent , canActivate : [AdminGuard]},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
