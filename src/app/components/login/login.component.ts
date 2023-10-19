import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formReg: FormGroup ;

  constructor(private authService : AuthService, private router : Router) { 
    this.formReg = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required]), 
  });}

  onSubmit() {
    if (this.formReg.valid) {
      this.authService
        .login(this.formReg.value)
        .then((response) => this.handleLoginSuccess(response))
        .catch((error) => this.handleLoginError(error));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, verifica los campos del formulario.',
      });
    }
  }

  logAdmin(){
    this.formReg.controls["email"].setValue("matias@gmail.com");
    this.formReg.controls["password"].setValue("123456");
  }

  logEmpleado(){
    this.formReg.controls["email"].setValue("matias2@gmail.com");
    this.formReg.controls["password"].setValue("123456");
  }


  handleLoginSuccess(response: any) {
  
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: '¡Bienvenido!',
      showConfirmButton: false,
      timer: 1500, // 1.5 segundos
    }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  handleLoginError(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesión',
      text: 'El inicio de sesión ha fallado. Por favor, verifica tus credenciales.',
    });
  }
}
