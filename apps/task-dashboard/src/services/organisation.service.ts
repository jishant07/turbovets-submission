import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { CreateOrganisationDto, Organisation, UpdateOrganisationDto } from '@turbovets/data';

export class OrganisationService {
    private http = inject(HttpClient);

    getAllOrganisations(): Observable<Organisation[]> {
        return this.http.get<Organisation[]>(environment.baseURL + 'organisation');
    }

    getOrganisationById(id: string): Observable<unknown> {
        return this.http.get(environment.baseURL + 'organisation/' + id)
    }

    createOrganisation(data: CreateOrganisationDto){
        return this.http.post(environment.baseURL + 'organisation', data)
    }

    editOrganisation(id: string, data: UpdateOrganisationDto){
        return this.http.patch(environment.baseURL+ "organisation/" + id, data)
    }

    deleteOrganisation(id: string){
        return this.http.delete(environment.baseURL+ "organisation/"+ id)
    }

}