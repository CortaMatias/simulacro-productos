import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  usuarioLogueado: boolean = false; 



  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      this.usuarioLogueado = user !== null; 
    });
  }
  constructor(private authService : AuthService, private router : Router){  }
  onClick() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/home/login']);
    })
    .catch(error => console.log(error));
  }
}
