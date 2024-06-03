import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export default class ForgetPasswordComponent implements OnInit{
  forgotForm !: FormGroup;
  fb = inject(FormBuilder);
  authService= inject(AuthService)

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  submit(){
   this.authService.sendEmailService(this.forgotForm.value.email)
   .subscribe({
    next:(res)=>{
      alert(res.message);
      this.forgotForm.reset();
    },
    error:(err)=>{
      alert(err.error.message)
    }
   })
  }
}
