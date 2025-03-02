import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { catchError, count, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

private http = inject(HttpClient);

private queryCacheCapital = new Map<string, Country[]>();
private queryCacheCountry = new Map<string, Country[]>();
private queryCacheRegion = new Map<Region, Country[]>();

serachByCapital(query:string): Observable<Country[]>{
  query = query.toLowerCase();
  const url = `${API_URL}/capital/${query}`;

  if(this.queryCacheCapital.has(query)){
    return of(this.queryCacheCapital.get(query)!);
  }

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    delay(500),
    tap(countries => this.queryCacheCapital.set(query, countries)),
    catchError(error => {
      console.log('Error en la peticion', error);
      return throwError(()=> new Error('Error en la peticion'))
    })
  )
}

serachByCountry(query:string): Observable<Country[]>{
  query = query.toLowerCase();
  const url = `${API_URL}/name/${query}`;

  if(this.queryCacheCountry.has(query)){
    return of(this.queryCacheCountry.get(query)!);
  }

  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    delay(500),
    tap(countries => this.queryCacheCountry.set(query, countries)),
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

serachByRegion(region:Region){
  const url = `${API_URL}/region/${region}`;
  if(this.queryCacheRegion.has(region)){
    return of(this.queryCacheRegion.get(region)!);
  }
  return this.http.get<RESTCountry[]>(url)
  .pipe(
    map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    delay(500),
    tap(countries => this.queryCacheRegion.set(region, countries)),
    catchError(error => {
      console.log('Error en la peticion', error);
      return throwError(()=> new Error('Error en la peticion'))
    })
  )
}


}
