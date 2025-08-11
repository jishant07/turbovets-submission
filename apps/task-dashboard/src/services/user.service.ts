import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { CreateUserDto, Roles, UpdateUserDto, User } from '@turbovets/data';

export class UserService {
    private http = inject(HttpClient);

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.baseURL + 'users');
    }

    getAllRoles(): Observable<Roles[]>{
        return this.http.get<Roles[]>(environment.baseURL + 'roles')
    }

    getUserById(id: string): Observable<unknown> {
        return this.http.get(environment.baseURL + 'users/' + id)
    }

    createUser(data: CreateUserDto){
        return this.http.post(environment.baseURL + 'users', data)
    }

    editUser(id: string, data: UpdateUserDto){
        return this.http.patch(environment.baseURL+ "users/" + id, data)
    }

    deleteUser(id: string){
        return this.http.delete(environment.baseURL+ "users/"+ id)
    }

}