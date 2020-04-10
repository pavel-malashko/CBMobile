import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';

const LogInRoutes: Routes = [
    {
        path: '',
        component: LogInComponent,
        // data: {
        //     title: 'login'
        // },
        children: [
            {
                path: 'sing-in',
                component: SignInComponent,
                data: {
                    title: 'sing-in'
                }
            },
            {
                path: 'registration',
                component: RegistrationComponent,
                data: {
                    title: 'registration'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(LogInRoutes)],
    exports: [RouterModule]
})

export class LogInRoutingModule { }
