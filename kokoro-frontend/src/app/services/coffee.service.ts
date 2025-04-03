import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Importamos HttpClient para recoger la información de la API
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  //URL de la API que proporciona los datos de los cafés
  // private apiUrl = 'http://localhost:8000/coffees';

  private apiUrl = environment.apiUrl;

  // private apiUrl = 'http://127.0.0.1:8000/coffees';
  //Añadimos el constructor con HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {
    console.log('URL de la API:', this.apiUrl);
  }
  //Creo el método para recoger los datos de la API de los cafés
  getCoffees(): Observable<Coffee[]> {
    console.log('Llamando al endpoint:', this.apiUrl); 
    return this.http.get<Coffee[]>(this.apiUrl);
  }
}
