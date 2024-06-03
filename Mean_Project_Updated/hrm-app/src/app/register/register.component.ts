import { Component, inject } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface Gender {
  value: string;
  viewValue: string;
}

interface Department {
  value: string;
  viewValue: string;
}

export interface DialogData {
  title: string;
  message: string;
  icon: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSlideToggleModule, MatSelectModule, MatStepperModule, MatDatepickerModule, MatIconModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [Validators, {
    provide: STEPPER_GLOBAL_OPTIONS,
    // useValue: {showError: true},
    useValue: { displayDefaultIndicatorType: false },
  }, provideNativeDateAdapter()],
})



export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  // Image Preview
  imageUrl: string = 'https://cdn.pixabay.com/phot  o/2023/07/04/19/43/man-8106958_960_720.png';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  // fb = inject(FormBuilder);

  gender: Gender[] = [
    { value: 'female', viewValue: 'Female' },
    { value: 'male', viewValue: 'Male' },
    // {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  department: Department[] = [
    { value: 'it', viewValue: 'IT' },
    { value: 'hr', viewValue: 'HR' },
    { value: 'marketing', viewValue: 'MARKETING' },
    // {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  firstFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: [, [Validators.required, Validators.minLength(10)]],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
  });


  secondFormGroup = this._formBuilder.group({
    department: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
  });


  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get('password'); // Get the password control
    const confirmPassword = control.value; // Get the value of confirmPwd directly
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword ? null : { passwordMismatch: true };
  }

  thirdFormGroup = this._formBuilder.group({
    tc: [false],
  });

  register() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      };

      console.log(formData);
      this.authService.registerService(formData)
        .subscribe({
          next: (res) => {
            // alert("Employee Created Successfully!");
            // console.log(formData);
            // this.router.navigate(['login'])
            this.firstFormGroup, this.secondFormGroup, this.thirdFormGroup.reset();
            this.dialog.open(DialogBoxComponent, {
              data: { title: 'Success!', message: 'Registration successful!', icon: "task_alt" }
            });
          },
          error: (err) => {
            console.log(err);
          }
        })

      // console.log('Form Data:', formData);
    }
  }


  // register() {

  //   this.authService.registerService(FormData)
  //     .subscribe({
  //       next: (res) => {
  //         alert("Employee Created Successfully!");
  //         console.log(this.formData);
  //         // this.registerForm.reset();
  //         this.router.navigate(['login'])
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     })
  // }


  isOptional = false;
  hide1 = true;
  hide2 = true;
  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) { }

  //For testing dialog box
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     data: {
  //       title: 'Success!',
  //       message: 'Registration successful!'
  //     },
  //   });
  // }

}
