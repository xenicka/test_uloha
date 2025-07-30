import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  private userUpdates = new Subject<void>();

  userUpdates$ = this.userUpdates.asObservable();

  constructor() {
    this.client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
    this.client.onConnect = () => {
      this.client.subscribe('/topic/users', () => {
        this.userUpdates.next();
      });
    };
    this.client.activate();
  }
}
