import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

import { io } from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket;
  constructor() {}
  async setupSocketConnection(data) {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('onScan', data);
    this.socket.on('connected_user', (data) => {
      console.log(data);
    });
  }
  async getConnected() {
    let observable = new Observable<{}>((observer) => {
      this.socket.on('connected_user', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  async newUserJoined() {
    // let observable = new Observable<{}>((observer) => {
    //   this.socket.on('connected_user', (data) => {
    //     observer.next(data);
    //     console.log('zaza ', data);
    //   });
    //   return () => {
    //     this.socket.disconnect();
    //   };
    // });
    // return observable;
  }

  // async onLogin() {
  //   this.socket.emit('connected', {});
  //   console.log('hi');
  // }
  // async onLogOut() {
  //   this.socket.emit('disconnected');
  // }
}
