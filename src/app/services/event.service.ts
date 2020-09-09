import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event = this.socket.fromEvent<IEvent>('event');

  constructor(private socket: Socket) { }
}
