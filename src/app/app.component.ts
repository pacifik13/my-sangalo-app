import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from './client';
import { ClientService } from './client.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export class User{
  constructor(
    public status:string,
     ) {}
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public clients: Client[];
  public editClient: Client;
  public deleteClient: Client;
  private apiServerurl = environment.apiBaseUrl;

  username = ''
  password = ''
  invalidLogin = false

  constructor(
    private clientService: ClientService,
    private http: HttpClient
    ) { }

  ngOnInit(){
    this.logOut();
  //  this.getClients();
  }
  
  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddClient(addForm: NgForm): void{
    document.getElementById('add-client-form').click();
    this.clientService.addClient(addForm.value).subscribe(
      (response: Client) => {
        console.log(response);
        alert("Client added successfully.");
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        console.log("Yeha milena");
        addForm.reset();
      }
    );
  }

  public onUpdateClient(client: Client): void{
    this.clientService.updateClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        alert("Client updated successfully.");
        this.getClients();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onDeleteClient(clientId: number): void{
    this.clientService.deleteClient(clientId).subscribe(
      (response: void) => {
        console.log(response);
        alert("Client deleted successfully.");
        this.getClients();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
        console.log("esma");
      }
    );
  }

  public searchClients(key: string): void{
    const results: Client[] = [];
    for(const client of this.clients){
      if (client.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || client.phoneno.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || client.address.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(client);
      }
    }
    this.clients = results;
    if (results.length === 0 || !key){
      this.getClients();
    }
  }

  public onOpenModal(client: Client, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addClientModal');
    }
    if (mode === 'edit'){
      this.editClient = client;
      button.setAttribute('data-target','#updateClientModal');
    }
    if (mode === 'delete'){
      this.deleteClient = client;
      button.setAttribute('data-target','#deleteClientModal');
    }
    container.appendChild(button);
    button.click();
  }

//authenticate_service
  public authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<User>(`${this.apiServerurl}/client/validateLogin`,{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
        return userData;
       }
     )

    );
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  public logOut() {
    sessionStorage.removeItem('username')
  }

//login_service
checkLogin() {
  (this.authenticate(this.username, this.password).subscribe(
    data => {
      this.getClients();
      this.invalidLogin = false
    },
    error => {
      this.invalidLogin = true

    }
  )
  );

}

}
