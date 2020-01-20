import { Injectable } from '@angular/core';
import{Observable} from'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http:HttpClient) {  }


public getAllcategories():Observable<any>{
return this.http.get("http://localhost:3000/categories");

}

public requestProduct(obj:any):Observable<any>{
  return this.http.post ("http://localhost:3000/requestproduct", obj);
  
  }

  

}
