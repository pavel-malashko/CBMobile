import { NgModule } from '@angular/core';
import { LogInComponent } from './log-in.component';
// import { RouterModule } from '@angular/router';
// import { LogInRoutes } from './log-in-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogInRoutingModule } from './log-in-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    imports: [
        LogInRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule
    ],
    exports: [],
    declarations: [
        LogInComponent,
        RegistrationComponent,
        SignInComponent
    ],
    providers: [],
})
export class LogInModule { }
