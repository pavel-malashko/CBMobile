import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { Message, User } from '../interfaces/api.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    public isLoading: boolean;
    public showAlert: BehaviorSubject<{type: string, message: string}> = new BehaviorSubject({type: '', message: ''});
    constructor(private _http: HttpClient, private _router: Router) {
    }

    registrationUser(data: User): Observable<any[]> {
        data.room_id = config.room_id;
        return this._http.post<any[]>(`${config.url}/api/auth/register`, data);
    }

    singInUser(data: User): Observable<any[]> {
        data.room_id = config.room_id;
        return this._http.post<any[]>(`${config.url}/api/auth/issue-token`, data);
    }

    storeMessage(data: Message): Observable<any> {
        return  this._http.post<any>(`${config.url}/api/rooms/${config.room_id}/messages`, data);
    }

    userInfo(): Observable<User> {
        return this._http.get<User>(`${config.url}/api/user`);
    }

    indexMessages(): Observable<any> {
        return this._http.get<any>(`${config.url}/api/rooms/${config.room_id}/messages`);
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('currentUser')) || null; // hash user need
    }

    hashOutData(messages: Message[]) {
        let users = JSON.parse(localStorage.getItem('hashUsers')) || [];
        const currentUser = this.getUser();
        users = users.filter(hash => hash.email !== currentUser.email);
        currentUser.messages = messages;
        users.push(currentUser);
        localStorage.setItem('hashUsers', JSON.stringify(users));
        localStorage.removeItem('currentUser');
    }

    checkHashAuth(checkUser: User): boolean {
        const users = JSON.parse(localStorage.getItem('hashUsers')) || [];
        const findByName = users.filter(item => item.email === checkUser.email && item.password === checkUser.password);
        if (findByName.length) {
            localStorage.setItem('currentUser', JSON.stringify(findByName[0]));
            return true;
        }
        return false;
    }

    hashCurrentUser(res: any, password: string): void {
        res.data.user.access_token = res.data.access_token;
        res.data.user.password =  password;
        const user = res.data.user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

}
