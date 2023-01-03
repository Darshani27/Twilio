import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MyserviceService } from 'src/app/shared/myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: any;
  user_name:string='';
  constructor(private ms:MyserviceService,private router:Router) { }

  ngOnInit(): void {
  }

  getToken()
  {
    this.ms.getToken(this.user_name).subscribe((res:any)=>{
      console.log(res);
      this.token=res.accessToken;
      localStorage.setItem('token',this.token);
      localStorage.setItem('user_name',this.user_name);
      this.router.navigate(['/conversation']);
    });
   
  }

}
