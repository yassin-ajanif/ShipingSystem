import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    const payload = this.loginForm.value as { email: string; password: string };

    this.authService.login(payload).subscribe({
      next: response => {
        this.isSubmitting = false;
        if (response.success) {
          this.router.navigate(['/dashboard']);
          return;
        }

        this.errorMessage = response.message || 'Login failed. Please try again.';
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage =
          err.error?.message ||
          err.error?.title ||
          'Unable to login. Please check your credentials and try again.';
      }
    });
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // TODO: Implement forgot password logic
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.hasError('required')) {
      const fieldDisplayName = this.translate.instant(`login.fieldNames.${fieldName}`);
      return `${fieldDisplayName} ${this.translate.instant('login.errors.required')}`;
    }
    if (control?.hasError('email')) {
      return this.translate.instant('login.errors.email');
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      const fieldDisplayName = this.translate.instant(`login.fieldNames.${fieldName}`);
      return `${fieldDisplayName} ${this.translate.instant('login.errors.minLength', { count: minLength })}`;
    }
    return '';
  }
}
