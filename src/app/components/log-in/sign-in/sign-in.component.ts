import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
    public form: FormGroup;
    constructor(private _fb: FormBuilder, private _apiSrv: ApiService, private _router: Router) {}

    ngOnInit() {
        this.form = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',  Validators.required],
        });
    }

    submit() {
        if (this._apiSrv.checkHashAuth(this.form.value)) {
            this._router.navigate(['/']);
        } else {
            this._apiSrv.isLoading = true;
            this._apiSrv.singInUser(this.form.value).pipe(
                first()
            ).subscribe((resp) => {
                this._apiSrv.hashCurrentUser(resp, this.form.controls.password.value);
                this._apiSrv.isLoading = false;
                this._router.navigate(['/']);
            });
        }
    }

}
