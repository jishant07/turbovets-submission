import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  imports: [CommonModule],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.css',
})
export class Forbidden {

  private router= inject(Router)

  handleRedirect(){
    const user = JSON.parse(localStorage.getItem('userInformation') || "")

    if(user.role == 'superadmin'){
      this.router.navigate(['/users'])
    }else{
      this.router.navigate(['/tasks'])
    }
  }


}
