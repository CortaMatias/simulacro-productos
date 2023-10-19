import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class logGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router) {} 

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const user = await this.authService.getCurrentUser();
      if (user) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes permisos para acceder a esta página',
        });
        setTimeout(() => {
            this.router.navigate(['/home/login']);
          }, 1000);
        return false;
      }
  }
  
}
