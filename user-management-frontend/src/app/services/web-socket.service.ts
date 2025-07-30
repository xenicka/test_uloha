import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | null = null;
  public messages: Subject<string> = new Subject();

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket connected');
      this.stompClient?.subscribe('/topic/users', (message: IMessage) => {
        if (message.body) {
          console.log('Received message:', message.body);
          this.messages.next(message.body);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.stompClient.onWebSocketError = (event) => {
      console.error('WebSocket error:', event);
    };

    this.stompClient.onWebSocketClose = (event) => {
      console.warn('WebSocket closed:', event);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
