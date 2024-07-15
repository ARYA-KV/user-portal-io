import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // isLoggedin() {
  //   throw new Error('Method not implemented.');
  // }
  serverUrl="https://user-portal-server-1.onrender.com"

  constructor(private http:HttpClient,private router:Router) { }
  loginAPI(email:any,password:any){
    //API call
    this.http.get(`${this.serverUrl}/users/1`).subscribe((result:any)=>{
      if(email==result.email && password==result.password){
        sessionStorage.setItem("admin",JSON.stringify(result))
        alert("Login Success")
        //redirect to navigate
        this.router.navigateByUrl('dashboard')

      }else{
        alert("Invalid Email / Password")
      }
    })
  }

  getAdminDetailsAPI(){
    return this.http.get(`${this.serverUrl}/users/1`)
  }
  editAdminAPI(adminDetails:any){
    return this.http.put(`${this.serverUrl}/users/1`,adminDetails)
  }
isLoggedin(){
  return !!sessionStorage.getItem("admin")
}


}
