import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
//import { Stomp } from 'stompjs';
//var SockJS = require('sockjs');
//var Stomp = require('stompjs');

const Stomp = require('stompjs').Stomp;



@Injectable()
export class StompService {

    private _stompClient: any;
    private _stompSubject : Subject<any> = new Subject<any>();

    public connect(_webSocketUrl: string) : void {
        let self = this;
        let webSocket = new WebSocket(_webSocketUrl);
        this._stompClient = Stomp.over(webSocket);
        this._stompClient.connect({}, function (frame:any) {
            self._stompClient.subscribe('/topic/greetings', function (stompResponse:any) {
                // stompResponse = {command, headers, body with JSON 
                // reflecting the object returned by Spring framework}
                console.log(stompResponse.body);
                self._stompSubject.next(JSON.parse(stompResponse.body));
            });
        });
    }

    public send(_payload: string) {
        this._stompClient.send("/api/hello", {}, {});
    }

      public getObservable() : Observable<any> {
        return this._stompSubject.asObservable();
    }
}