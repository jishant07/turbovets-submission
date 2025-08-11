import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 

export class LoginService {
    private http = inject(HttpClient);

    login(data: unknown): Observable<unknown> {
        return this.http.post(environment.baseURL + 'users/login', data);
    }
}