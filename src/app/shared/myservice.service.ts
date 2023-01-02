import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  activeUser:any=new Subject();
  constructor(private http:HttpClient) { }

  setActiveUser(data:any)
  {
    this.activeUser.next(data);
  }

  getActiveUser()
  {
    return this.activeUser;
  }

  getToken(data:string)
  {
    return this.http.get(`http://localhost:3000/token?identifier=${data}`).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
}
