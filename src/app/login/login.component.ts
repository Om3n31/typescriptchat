import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService} from '../message.service'
import { Location } from '@angular/common';

import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorList = {
    nameLengthError: false,
    nameOrPwMatchError: false,
    passwordsNotMatching: false,
    passwordLengthError: false
  }
  errorState: boolean = false;
  registering: boolean = false;
  sessionID: Number;

  constructor( private messageService: MessageService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }
  logIn(userPseudo: String, password: String, passwordConfirm: String = null){
    if(passwordConfirm == password || passwordConfirm == null){
       this.messageService.logInPost(userPseudo, password, this.registering).subscribe(result => {this.sessionID = result.user_session_id; console.log(result); this.gotoChat(userPseudo, this.sessionID)})   
    }
  }
  switchState(){
    this.registering = !this.registering
  }
  gotoChat(user_pseudo: String, sessionID: Number){
    console.log(sessionID)
    let user_session_id = Number(sessionID)
    if(user_session_id){
      this.router.navigate(['/chat/',  {user_pseudo, user_session_id} ]);
    }else{
      this.errorState = true;
    }
  }

}
