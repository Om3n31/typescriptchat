import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

import { User } from './user';
import { Message } from './message';


import { MessageCed } from './message-ced';
import { nextTick } from 'process';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private servUrl = "http://109.220.238.172:8080"
  private servCedUrl = "http://2.4.233.126:8080"
  private localUrl = "http://localhost:8281"
  private bitchass;
  private testList;
  //private optionRequete = {headers: new HttpHeaders({'Access-Control-Allow-Origin':'*'}), observe: 'body', responseType: 'json'};

  data: any;

  returns: any;
  constructor(private http: HttpClient) { }

  logInPost(user_pseudo: String, user_password: String, registering: Boolean): Observable<User> {

    if (registering) {
      return this.http.post<User>(this.localUrl + '/inscription',
        {
          user_pseudo: user_pseudo,
          user_mdp: user_password
        })
    } else {
      return this.http.post<User>(this.localUrl + '/connexion',
        {
          user_id: null,
          user_pseudo: user_pseudo,
          user_session_id: null,
          user_mdp: user_password
        })
    }


  }
  messagePost(messageContent: String, user_session_id: Number): Observable<Message[]> {
    let newMessage: Message = {
      message: messageContent,
      post_date: Date.now(),
      user: {
        user_id: null,
        user_pseudo: null,
        user_session_id: user_session_id,
        user_mdp: null
      }
    }
    try {
      return this.http.post<Message[]>(this.localUrl + '/messagePost', newMessage)
    } catch (e) {
      throw new Error(e)
    }

  }
  messageGet(user_session_id): Observable<Message[]> {
    try {
      return this.http.post<Message[]>(this.localUrl + '/messageGet', {
        user_id: null,
        user_pseudo: null,
        user_session_id: user_session_id,
        user_mdp: null
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}
