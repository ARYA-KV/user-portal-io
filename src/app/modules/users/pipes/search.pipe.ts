import { Pipe, PipeTransform } from '@angular/core';
import { userModel } from '../user-model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  

  transform(allUsers:any[],searchKey:string): any[] {
    const result:any=[]
    if (!allUsers || searchKey=="") {
      return allUsers
      
    } else {
      allUsers.forEach((item:any)=>{
        if (item['name'].toLowerCase().includes(searchKey.toLowerCase())) {
          result.push(item)
          
        }
      })
      
    }
    return result;
    
  }

}
