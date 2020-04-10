import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { PusherService } from 'src/app/services/pusher.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/auth.guard';
// import { ApiService } from 'src/app/services/api.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        ChatRoutingModule,
        CommonModule,
    ],
    exports: [],
    declarations: [ChatComponent],
    providers: [PusherService, AuthGuard],
})
export class ChatModule { }
