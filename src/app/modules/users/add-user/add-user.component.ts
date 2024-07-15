import { Component, OnInit } from '@angular/core';
import { userModel } from '../user-model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user:userModel={}
  allUsers:any=[]
  constructor(private api:ApiService,private router:Router){ }
  ngOnInit(): void {
      this.api.getAllUsersAPI().subscribe((result:any)=>{
        this.allUsers=result
      })
  }
  cancel(){
    this.user={}
  }
  saveUser(){
    const existingUser=this.allUsers.find((item:any)=>item.id==this.user.id)
    if (existingUser) {
      alert("Employee Id already exist...Use unique id to add new user!!!")
      
    } else {
       //api call
    this.api.addUserAPI(this.user).subscribe({
      next:(result:any)=>{
        alert("user add successfully to db")
        this.router.navigateByUrl('/users')
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
      
    }
   

}
