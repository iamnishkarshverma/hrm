import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  providers: [Validators,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    // tc: [true]
  });

  
  constructor(private router: Router, private authService: AuthService) { }

login() {
  this.authService.loginService(this.loginForm.value)
    .subscribe({
      next: (res) => {
        alert("Login is  success!");
        localStorage.setItem("employee_id",res.data._id)
        this.router.navigate(['dashboard']);
        this.loginForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      }
    })
}

}
