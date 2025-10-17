import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './chat-view.html',
  styleUrl: './chat-view.scss',
})
export class ChatView {
  listOnUser: any = [];

  listMsg: any = [];

  msg!: string;

  constructor(
    // public signalrService: SignalrService,
  ) {

  }

  sendMsg() {}

  logOut() {}
}
