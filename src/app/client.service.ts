import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiServerurl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerurl}/client/all`);
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerurl}/client/add`, client);
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiServerurl}/client/update`, client);
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerurl}/client/delete/${clientId}`);
  }
}
