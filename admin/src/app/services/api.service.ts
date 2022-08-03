import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'http://localhost:3000/api/';
  // private apiUrl = 'http://api.canelaymiel.tk/api/';
  
  public welcome() {
    return this.http.get(this.apiUrl);
  }

  public async login(body: any) {
    console.log(body);
    
    return this.http.post(this.apiUrl + 'users/login', body);
  }

  public getApiUrl() {
    return this.apiUrl;
  }
  
  public getUrl(){
    return this.apiUrl.split('/api/')[0];
  }

  public mostrarRecursos(modelo: string){
    return this.http.get(this.apiUrl + modelo);
  }

  public sendEmail(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'email', {body: body});
  }

  public crearRecurso(modelo: string, body: any){
    return this.http.post(this.apiUrl + modelo, body);
  }

  public mostrarRecursosPorPartes(modelo: string, opciones: any){
    return this.http.get(this.apiUrl + modelo + '?' + 'limit=' + opciones.limit + '&offset=' + opciones.offset + '&sort=' + opciones.sort + '&date=' + opciones.date);
  }

  public eliminarRecurso(modelo: string, id: number){
    return this.http.delete(this.apiUrl + modelo + '/' + id);
  }

  public actualizarRecurso(modelo: string, id: number, body: any){
    return this.http.put(this.apiUrl + modelo + '/' + id, body);
  }

  public activateRecurso(modelo: string, id: number, body: any){
    return this.http.put(this.apiUrl + modelo + '/activate/' + id , body);
  }

  public mostrarRecursoPorId(modelo: string, id: number){
    return this.http.get(this.apiUrl + modelo + '/' + id);
  }

  public mostrarRecursosPorDate(modelo: string, date: string){
    return this.http.get(this.apiUrl + modelo + '?date=' + date);
  }
}
