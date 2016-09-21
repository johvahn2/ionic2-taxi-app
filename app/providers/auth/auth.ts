import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class Auther {


  constructor(private http: Http) {}

/*--------------HTTP----------------------------*/
public MAIN_URL: string = "https://taxigrid.herokuapp.com";

public contentHeader: Headers = new Headers({"Content-Type": "application/json"});

public SIGNUP_URL: string = "https://taxigrid.herokuapp.com/signup";

DRIVER_SIGNUP_URL: string = "https://taxigrid.herokuapp.com/driver/register";




/*----------------Sockets----------------------*/
public SOCKET_CONNECT = "https://taxigrid6.herokuapp.com/";


/*-------------Functions---------------------------------*/
signup(email,firstName,lastName,password,phoneNumber){
 var msg;
  let Info={
    email:email,
    firstName:firstName,
    lastName:lastName,
    password:password,
    phoneNumber:phoneNumber
  }

return new Promise(resolve=>{

  this.http.post(this.SIGNUP_URL, JSON.stringify(Info), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
            msg= data.msg;
            console.log(msg);
            resolve(msg);

        },err => console.log(err));
    });

  }

}



