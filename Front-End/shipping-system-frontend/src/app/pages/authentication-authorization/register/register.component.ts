import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]]
    }, { validators: this.passwordsMatchValidator });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = this.registerForm.value;

    const payload = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone: phoneNumber,
      role: null,
      returnUrl: null
    };

    this.authService.signUp(payload).subscribe({
      next: response => {
        this.isSubmitting = false;
        if (response.success) {
          this.successMessage = response.message || 'Registration successful.';
          this.router.navigate(['/login']);
          return;
        }
        this.errorMessage =
          response.message || response.errors?.join(', ') || 'Registration failed. Please try again.';
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage =
          err.error?.message ||
          err.error?.title ||
          'Unable to register. Please check your details and try again.';
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.registerForm.get(fieldName);
    if (control?.hasError('required')) {
      const fieldDisplayName = this.translate.instant(`register.fieldNames.${fieldName}`);
      return `${fieldDisplayName} ${this.translate.instant('register.errors.required')}`;
    }
    if (control?.hasError('email')) {
      return this.translate.instant('register.errors.email');
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      const fieldDisplayName = this.translate.instant(`register.fieldNames.${fieldName}`);
      return `${fieldDisplayName} ${this.translate.instant('register.errors.minLength', { count: minLength })}`;
    }
    if (fieldName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return this.translate.instant('register.errors.passwordsDoNotMatch') || 'Passwords do not match';
    }
    if (control?.hasError('pattern')) {
      return this.translate.instant('register.errors.phonePattern');
    }
    return '';
  }

  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
