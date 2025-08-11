import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { JWTDecodeService } from '../services/jwt-decode.service';

interface LoginResponse {
    success: boolean
    token: string
    message: string
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LoginService, JWTDecodeService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!: FormGroup
  private loginService = inject(LoginService)
  private jwtDecodeService = inject(JWTDecodeService)
  private router = inject(Router)

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe((response: unknown) => {
        const loginResponse = response as LoginResponse;
        if (loginResponse?.success) {
          localStorage.setItem('token', loginResponse?.token)
          localStorage.setItem('userInformation',JSON.stringify(this.jwtDecodeService.decodeJWT()))

          interface DecodedUserInformation {
            [key: string]: unknown;
          }
          
          const decodedUserInformation: DecodedUserInformation = this.jwtDecodeService.decodeJWT() as unknown as DecodedUserInformation;

          if(decodedUserInformation["role"] === 'superadmin'){
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/tasks']);
          }
          
        }
      })
    }
  }

}
