import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Organisation, Roles, User } from '@turbovets/data';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganisationService } from '../services/organisation.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService, OrganisationService],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  userList : User[] = []
  rolesList : Roles[] = []
  organisationList: Organisation[] = []

  private userService = inject(UserService)
  private organisationService = inject(OrganisationService)
  isSuperAdmin: boolean
  availablePermission: string[]
  canUserEdit: boolean
  canUserDelete: boolean
  canUserCreate: boolean
  showCreateUser = false

  userCreateForm!: FormGroup

  ngOnInit(): void {
    
    this.getUsers()

    const user = JSON.parse(localStorage.getItem('userInformation') || "")
    this.isSuperAdmin = user.role === 'superadmin'
    this.availablePermission = user.permissions

    this.canUserEdit = (
      this.availablePermission.some((p: string) => p.includes('all')) ||
      [`users:update`].every(p => this.availablePermission.includes(p))
    );

    this.canUserDelete = (
      this.availablePermission.some((p: string) => p.includes('all')) ||
      [`users:update`].every(p => this.availablePermission.includes(p))
    );

    this.canUserCreate = (
      this.availablePermission.some((p: string) => p.includes('all')) ||
      [`users:create`].every(p => this.availablePermission.includes(p))
    );

    this.userCreateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      userRoleId: new FormControl('', [Validators.required]),
      organisationId: new FormControl('', [Validators.required])
    })

    this.getRoles()

    this.getOrganisations()

  }

  getUsers(){
    this.userService.getAllUsers().subscribe((response: User[]) =>{
      this.userList = response
    })
  }

  getRoles(){
    this.userService.getAllRoles().subscribe((response: Roles[]) =>{
      this.rolesList = response
    })
  }

  getOrganisations(){
    this.organisationService.getAllOrganisations().subscribe((response: Organisation[]) =>{
      this.organisationList = response
    })
  }

  toggleCreateUser(){
    this.showCreateUser = !this.showCreateUser
  }

  handleSubmit(event: Event){
    event.preventDefault()
    this.showCreateUser = !this.showCreateUser

    if(this.userCreateForm.valid){
      this.userService.createUser(this.userCreateForm.value).subscribe((response : any) =>{
        if(response?.success){
          this.getUsers()
        }
      })
    }
  }

  get filteredRoles() {
    return this.rolesList.filter(role => role.name !== 'superadmin');
  }

}
