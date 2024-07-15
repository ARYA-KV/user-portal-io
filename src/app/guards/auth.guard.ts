import { CanActivateFn,Router } from '@angular/router';
import { AdminService } from '../adminServices/admin.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AdminService)
  const router = inject(Router)


  if(authService.isLoggedin()){
    return true;
  }else{
    alert("Operatiom denied please login!!")
    router.navigateByUrl("")
    return false;
  }
  
};
