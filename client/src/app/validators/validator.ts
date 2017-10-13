import { FormGroup , FormControl  } from '@angular/forms';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import { RegisterComponent} from "../components/register/register.component";

export class  CustomValidator{

    static usernameValidator(control){

      const egExp = new RegExp (/^[A-Za-z0-9_]{3,35}$/);
            if (egExp.test(control.value )){
              return null ;
            }else {
            //  return {usernameValidator:true}
              return {'usernameValidator' : true};
            }
    }



  static cannotContainSpace(control) {

    if(control.value.indexOf(' ') >= 0  )
      return {cannotContainSpace:true};

    return null;
  }


  static emailValidator (control){

    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if(regExp.test(control.value)){
          return null;
        }else {
          return {'emailValidator':true};
        }

  }

  static passwordlValidator (control){

    const regExp = new RegExp (/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/);

    if(regExp.test(control.value)){
      return null;
    }else {
      return {'passwordlValidator':true};
    }

  }



  static marchingPassword(password, confirmpass){
    return(group:FormGroup)=>{
      if(group.controls[password].value === group.controls[confirmpass].value){
        return null;
      }else{
        return {'machaingPassword':true}
      }
    }
  }

 /* formEnable(form){
    this.form.get('username').enable();
    this.form.get('email').enable();
    this.form.get('password').enable();
    this.form.get('confirmpass').enable();
  }
  formDisable(){
    this.form.get('username').disable();
    this.form.get('email').disable();
    this.form.get('password').disable();
    this.form.get('confirmpass').disable();
  }*/



}
