import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GeneralService {
  title = null;
  emitter: EventEmitter<string> = new EventEmitter();
  public changeModule(type: string) {
    this.emitter.emit(type);
  }

  public routeName(isGroup){
    switch(isGroup){  
      case 'Admin':  
        return "customer/welcome-admin"; 
      case 'Customer':  
        return "customer/welcome-customer";  
      default:  
        return "";
    }
  }
  public isCustomer(){
    const userData = JSON.parse(localStorage.getItem("user_data"));
      return userData?.groups[0].toLowerCase() === 'customer' ? true : false;
  }
  public setTitle(title){
    this.title = title;
  }
}
