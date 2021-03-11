import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



import { Message } from '../message';
import { MessageService } from '../message.service'
import { MessageCed } from '../message-ced';
import { UserCed } from '../user-ced';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user_pseudo: String
  user_session_id: Number
  messageList: Message[]
  queryPending = false;





  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private messageService: MessageService) { }

  postMessage(message: String): void {
    if (message.replace(/\s/g, '').length) {
      this.queryPending = true;
      try {
        this.messageService.messagePost(message, this.user_session_id).subscribe(result => { this.messageList = result; this.getWhatever(this.user_session_id); this.queryPending = false })
      } catch (e) {
        console.log(e)
      }

    }

  }
  getWhatever(user_session_id): void {
    this.queryPending = true;
    try {
      this.messageService.messageGet(user_session_id).subscribe(result => { this.messageList = result; this.messageList.reverse(); this.queryPending = false })
    } catch (e) {
      console.log(e)
    }

  }
  convertDate(input: number): Date {
    return new Date(input)
  }
  ngOnInit(): void {
    this.user_pseudo = this.route.snapshot.paramMap.get('user_pseudo');
    this.user_session_id = Number(this.route.snapshot.paramMap.get('user_session_id'))
    console.log(this.user_session_id)
    console.log(this.user_pseudo)
    if (!this.user_pseudo) {
      this.router.navigate(['/login']);
    }
    this.getWhatever(this.user_session_id);
  }
}
