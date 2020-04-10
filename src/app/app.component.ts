import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private _apiSrv: ApiService, private _router: Router, private _snackBar: MatSnackBar) {}

    ngOnInit() {
        if (this._apiSrv.getUser()) {
            this._router.navigate(['/']);
        }
        this._apiSrv.showAlert.subscribe((alert) => {
            if (alert.message) {
                this._snackBar.open(alert.message, '', {
                    panelClass: alert.type,
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        });
    }
}
