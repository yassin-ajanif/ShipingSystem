import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions';
import * as LoginSelectors from './store/login.selectors';
import { loginRequestDto } from './dtos/loginRequestDto';
import { AppState } from '../../../store/app.state';

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

  store: Store<AppState> = inject(Store<AppState>);
  readonly isError = this.store.selectSignal(LoginSelectors.IsError);
  readonly isAuthenticated = this.store.selectSignal(LoginSelectors.IsAuthenticated);
  readonly isLoggedOut = this.store.selectSignal(LoginSelectors.IsLoggedOut);

  constructor(
    private fb: FormBuilder, 
    private translate: TranslateService,
    private router: Router,
    
  ) {
    this.loginForm = this.fb.group({
      email: ['yassin4.ajanif@gmail.com', [Validators.required, Validators.email]],
      password: ['yassinajanif1A*', [Validators.required, Validators.minLength(6)]]
    });
    this.registerSignalEffects();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    this.errorMessage = '';
    
    const credentials = this.loginForm.value as loginRequestDto;
    this.store.dispatch(LoginActions.login({ credentials }));
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // TODO: Implement forgot password logic
  }

  private registerSignalEffects() {
    // React to errors without manual subscriptions
    effect(() => {
      const error = this.isError();
      if (error) {
        this.errorMessage = error;
        this.isSubmitting = false;
      } else {
        this.errorMessage = '';
      }
    });

    // Navigate on successful login
    effect(() => {
      if (this.isAuthenticated()) {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      }
    });

    // Listen to logged-out state without navigation
    effect(() => {
      if (this.isLoggedOut()) {
        this.router.navigate(['/login']);
      }
    });
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
