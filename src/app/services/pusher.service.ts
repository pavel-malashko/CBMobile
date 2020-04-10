import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { config } from '../config';
import { ApiService } from './api.service';
import { Message } from '../interfaces/api.interface';
import { Subject } from 'rxjs';

@Injectable()

export class PusherService {
    public messagesStream$: Subject<any> = new Subject<any>();
    public isHashUser: boolean;
    private _channel: any;
    constructor(private _apiSrv: ApiService) {}

    authPusher(): void {
        const currentUser = this._apiSrv.getUser();
        this.isHashUser = currentUser && currentUser.hasOwnProperty('messages') ? true : false;
        const pusher: any = new Pusher(config.key, {
            auth: {
                headers: {
                    Authorization: `Bearer ${currentUser.access_token}`,
                },
                params: {}
            },
            authEndpoint: config.endPoint,
            wsHost: config.host,
            wsPort: config.port,
        });
        this._channel = pusher.subscribe(`private-App.Room.${config.room_id}`);
        this._channel.bind(config.nameEvent, (data: Message) => {
            this.messagesStream$.next(data);
        });

    }
}
