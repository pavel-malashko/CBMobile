import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
    public form: FormGroup;
    constructor(private _fb: FormBuilder, private _apiSrv: ApiService, private _router: Router) {}

    ngOnInit() {
        this.form = this._fb.group({
            name: ['',  Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['',  Validators.required],
        });
    }

     submit(): void {
        this._apiSrv.isLoading = true;
        this._apiSrv.registrationUser(this.form.value).pipe(
            first()
        ).subscribe((resp) => {
            this._apiSrv.hashCurrentUser(resp, this.form.controls.password.value);
            this._apiSrv.isLoading = false;
            this._router.navigate(['/']);
        });
    }
}
