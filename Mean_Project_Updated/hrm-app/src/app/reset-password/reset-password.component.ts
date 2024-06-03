import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetForm !: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  token!: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
    })
    this.activatedRoute.params.subscribe(val => {
      this.token = val['token']
      console.log(this.token)
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('pwd');
    const confirmPassword = control.value;
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword ? null : { passwordMismatch: true };
  }

  hide1 = true;
  hide2 = true;


  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.resetForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err.error.message)
        }
      })
  }
}
