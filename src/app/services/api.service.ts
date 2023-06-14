import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient ) { }

  postOrder(data:any){
    return this.http.post<any>("http://localhost:3000/productList/",data);
  }
  getOrder(){
    return this.http.get<any>("http://localhost:3000/productList/");
  
  }
  putOrder(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/productList/"+id,data);

  }
  deleteOrder(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);

  }
}
