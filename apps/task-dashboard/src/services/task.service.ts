import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { CreateTaskDto, UpdateTaskDto } from '@turbovets/data';

export class TaskService {
    private http = inject(HttpClient);

    getAllTasks(): Observable<unknown> {
        return this.http.get(environment.baseURL + 'tasks');
    }

    getTaskById(id: string): Observable<unknown> {
        return this.http.get(environment.baseURL + 'tasks/' + id)
    }

    getAllTaskOfUser(userId: string){
        return this.http.get(environment.baseURL + 'tasks/userTasks/' + userId)   
    }

    createTask(data: CreateTaskDto){
        return this.http.post(environment.baseURL + 'tasks', data)
    }

    editTask(id: string, data: UpdateTaskDto){
        return this.http.put(environment.baseURL+ "tasks/" + id, data)
    }

    deleteTask(id: string){
        return this.http.delete(environment.baseURL+ "tasks/"+ id)
    }

}