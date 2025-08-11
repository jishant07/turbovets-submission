import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {

  userName!: string
  isSuperAdmin!: boolean
  private router = inject(Router)

  ngOnInit(): void {
    const userInformation = JSON.parse(localStorage.getItem('userInformation') || "")
    this.isSuperAdmin = userInformation?.role === 'superadmin'
    this.userName = JSON.parse(localStorage.getItem('userInformation') || "").name  
  }

  isAuthenticated(){
    return !!localStorage.getItem('token')
  }

  handlerLogout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
