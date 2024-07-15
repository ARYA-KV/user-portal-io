import { Component, OnInit } from '@angular/core';
import { userModel } from '../user-model';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  p: number = 1;
  searchKey:string=""
  allUsers:userModel[]=[]

  ngOnInit(): void {
      this.getAllUsersAPI()
  }
  constructor(private api:ApiService){}
  getAllUsersAPI(){
    this.api.getAllUsersAPI().subscribe((result:any)=>{
      this.allUsers=result.filter((user:any)=>user.id!="1")
      console.log(this.allUsers);
      
    })
  }
  removeUser(userId:any){
    this.api.removeUserAPI(userId).subscribe((result:any)=>{
      this.getAllUsersAPI()
    })
  }
  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.id.localeCompare(user2.id))
  }
  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
    console.log(this.allUsers);
    
  }
   generatePDF(){
    let pdf = new jspdf()
    let head = [['ID','NAME','EMAIL','STATUS']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status=="1"?"Active":"InActive"])
    })
    pdf.setFontSize(16)
    pdf.text("All USERS LIST",10,10)
    autoTable(pdf,{
      head,body
    })
    pdf.output('dataurlnewwindow')
    pdf.save("all-users-list.pdf")
   }

}
