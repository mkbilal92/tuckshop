import { Injectable } from '@angular/core';
import{Observable, Subject} from'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductListingService {

  private _productListingSource = new Subject <object>();
  productListing$ = this._productListingSource.asObservable();

  constructor(private http:HttpClient) { }


  public getAllproducts():Observable<any>{
  return this.http.get("http://localhost:3000/products")
  }

  public sendProduct(obj:Object) {
  this._productListingSource.next (Object.create(obj)) ;


  }
  public getCategoryToUrl(urlFilterToCategory: string):Observable<any>{
    return this.http.get ("http://localhost:3000/products?category="+urlFilterToCategory);
    }

}
