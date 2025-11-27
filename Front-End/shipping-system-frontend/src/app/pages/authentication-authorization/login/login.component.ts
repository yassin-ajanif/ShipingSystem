import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hidePassword = true;
  isSubmitting = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private translate: TranslateService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['yassin4.ajanif@gmail.com', [Validators.required, Validators.email]],
      password: ['yassinajanif1A*', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Subscribe to login state to handle errors and success
    this.store.select(LoginSelectors.IsError)
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      });

    // Navigate on successful login
    this.store.select(LoginSelectors.IsAuthenticated)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        }
      });

    // Listen to logged-out state without navigation
    this.store.select(LoginSelectors.IsLoggedOut)
      .pipe(takeUntil(this.destroy$))
      .subscribe((IsLoggedOut) => {
        if(IsLoggedOut) this.router.navigate(['/login']);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
