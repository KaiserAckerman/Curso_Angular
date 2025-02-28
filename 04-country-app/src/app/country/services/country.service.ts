import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

private http = inject(HttpClient);

serachByCapital(query:string): Observable<Country[]>{
  query = query.toLowerCase();
  const url = `${API_URL}/capital/${query}`;

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    delay(500),
    catchError(error => {
      console.log('Error en la peticion', error);
      return throwError(()=> new Error('Error en la peticion'))
    })
  )
}

serachByCountry(query:string): Observable<Country[]>{
  query = query.toLowerCase();
  const url = `${API_URL}/name/${query}`;

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    delay(500),
    catchError(error => {
      console.log('Error en la peticion', error);
      return throwError(()=> new Error('Error en la peticion'))
    })
  )
}

serachCountryByAlphaCode(code:string){
  const url = `${API_URL}/alpha/${code}`;

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    map(countries => countries.at(0)),
    catchError(error => {
      console.log('Error en la peticion', error);
      return throwError(()=> new Error(`No se pudo obtener paises con ese codigo ${code}`))
    })
  )
}

}
