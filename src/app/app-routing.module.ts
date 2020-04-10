import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule)
        }]
    },
    {
        path: 'login',
        loadChildren: () => import('./components/log-in/log-in.module').then(m => m.LogInModule)
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
