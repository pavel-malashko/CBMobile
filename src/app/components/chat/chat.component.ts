import { Component, OnInit, OnDestroy } from '@angular/core';
import { PusherService } from 'src/app/services/pusher.service';
import { ApiService } from 'src/app/services/api.service';
import { User, Message } from 'src/app/interfaces/api.interface';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, OnDestroy {
    public messageControl = new FormControl('');
    public dataMessages: Message[] = [];
    public currentUser: User;
    private _unsubscribe$: Subject<any> = new Subject<any>();
    constructor(
        private _pusherSrv: PusherService,
        private _apiSrv: ApiService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.init();
    }

    init(): void {
        this._pusherSrv.authPusher();
        if (this._pusherSrv.isHashUser) {
            const currentUser = this._apiSrv.getUser();
            this.currentUser = currentUser;
            this.dataMessages = currentUser.messages;
        } else {
            this._apiSrv.isLoading = true;
            forkJoin(
                this._apiSrv.userInfo(),
                this._apiSrv.indexMessages()
            ).pipe(
                takeUntil(this._unsubscribe$)
            )
            .subscribe(([user, messages]) => {
                this.currentUser = user;
                this.dataMessages = messages.data.map(item => {
                    return {
                        user_id: item.user_id,
                        name: item.user.name,
                        text: item.text
                    };
                }).reverse();
                this._apiSrv.isLoading = false;
            });

            this._pusherSrv.messagesStream$.pipe(
                takeUntil(this._unsubscribe$)
            )
            .subscribe(mes => {
                this.dataMessages.push(mes);
            });
        }
    }

    sent(): void {
        if (this.messageControl.value) {
            const data = {text: this.messageControl.value, name: this.currentUser.name};
            this._apiSrv.isLoading = true;
            this._apiSrv.storeMessage(data).pipe(
                takeUntil(this._unsubscribe$)
            )
            .subscribe(() => {
                this.messageControl.reset();
                this._apiSrv.isLoading = false;
            });
        }
    }

    logOut(): void {
        this._apiSrv.hashOutData(this.dataMessages);
        this._router.navigate(['/login']);
    }

    ngOnDestroy() {
        if (!this._pusherSrv.isHashUser) {
            this._unsubscribe$.next();
            this._unsubscribe$.complete();
        }
    }
}
