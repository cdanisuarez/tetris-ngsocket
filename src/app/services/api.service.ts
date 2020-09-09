import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  event = this.socket.fromEvent<IEvent>('event');
  events = this.socket.fromEvent<string[]>('events');

  constructor(private socket: Socket) { }

  getEvent(id: string) {
    this.socket.emit('getEvent', id);
  }

  newEvent() {
    this.socket.emit('addEvent', { id: this.eventId(), doc: '' });
  }

  editDocument(event: IEvent) {
    this.socket.emit('editEvent', event);
  }

  private eventId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
