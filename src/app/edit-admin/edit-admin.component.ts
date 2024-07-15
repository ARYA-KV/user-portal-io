import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../adminServices/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  adminProfile:string = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1719979295~exp=1719982895~hmac=2083e9d32caeaaff99c52ce2be1736905831106e20c08112116e3280aa77f170&w=740"

  editAdminStatus:boolean = false
  adminDetails:any = {}
  //share data from parent to child
  @Output() onAdminChange = new  EventEmitter()

  constructor(private adminAPI:AdminService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetailsAPI().subscribe((result:any)=>{
      this.adminDetails = result
      if(result.profile){
        this.adminProfile = result.profile
      }
    })
  }

  editAdminBtnClicked(){
    this.editAdminStatus = true
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      this.adminProfile = event.target.result
      this.adminDetails.profile = this.adminProfile
    }
  }

  cancel(){
    this.editAdminStatus=false
  }

  updateAdmin(){
   if (this.adminDetails.name && this.adminDetails.password) {
     this.adminAPI.editAdminAPI(this.adminDetails).subscribe({
       next:(result:any)=>{
         this.editAdminStatus = false
         alert("Admin details updated successfully")
         sessionStorage.setItem("admin",JSON.stringify(result))
         this.onAdminChange.emit(result.name)
       },
       error:(reason:any)=>{
         console.log(reason);
         alert("Update failed..Try after sometime")
         
       }
     })
   } else {
    alert("Please fill the form completely!!")
   }
  }
}