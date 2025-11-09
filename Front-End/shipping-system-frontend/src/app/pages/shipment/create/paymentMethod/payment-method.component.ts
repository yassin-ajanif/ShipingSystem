import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['creditCard', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardholderName: ['', [Validators.required]]
    });

    // Listen to payment method changes to enable/disable card fields
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'creditCard') {
        this.enableCardFields();
      } else {
        this.disableCardFields();
      }
    });
  }

  private enableCardFields(): void {
    this.paymentForm.get('cardNumber')?.enable();
    this.paymentForm.get('expiryDate')?.enable();
    this.paymentForm.get('cvv')?.enable();
    this.paymentForm.get('cardholderName')?.enable();
  }

  private disableCardFields(): void {
    this.paymentForm.get('cardNumber')?.disable();
    this.paymentForm.get('expiryDate')?.disable();
    this.paymentForm.get('cvv')?.disable();
    this.paymentForm.get('cardholderName')?.disable();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.paymentForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    
    if (field?.hasError('pattern')) {
      if (fieldName === 'cardNumber') {
        return 'Please enter a valid 16-digit card number';
      }
      if (fieldName === 'expiryDate') {
        return 'Please enter date in MM/YY format';
      }
      if (fieldName === 'cvv') {
        return 'Please enter a valid CVV';
      }
    }
    
    return '';
  }

  getPaymentData() {
    return this.paymentForm.value;
  }

  isValid(): boolean {
    return this.paymentForm.valid;
  }
}
