import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseURL;
interface Options{
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductResponse>();

  getProducts(options: Options): Observable<ProductResponse> {

    const { limit = 12, offset = 0, gender = 'women' } = options;
    const key = `${limit}-${offset}-${gender}`;
    
    if (this.productsCache.has(key) ){
      return of(this.productsCache.get(key)!)
    }

    return this.http.get<ProductResponse>(`${baseURL}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    })
    .pipe(
      tap((resp)=> console.log(resp)),
      tap((resp)=> this.productsCache.set(key, resp))
    );
  }

  getProductByIdSlug(idSlug: string): Observable<Product>{
     return this.http.get<Product>(`${baseURL}/products/${idSlug}`)
  }
}
