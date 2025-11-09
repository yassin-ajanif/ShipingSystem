import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  selectedPlan: any = null;
  isProcessing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      nameOnCard: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
  }

  ngOnInit(): void {
    // Get selected plan from query params
    this.route.queryParams.subscribe(params => {
      const planId = params['plan'];
      if (planId) {
        // Recreate plan object based on ID
        this.selectedPlan = {
          id: planId,
          name: planId === 'pro' ? 'Pro' : planId,
          price: planId === 'pro' ? 49 : 0
        };
      } else {
        // If no plan selected, redirect to pricing
        this.router.navigate(['/packages/pricing']);
      }
    });
  }

  onActivatePackage(): void {
    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach(key => {
        this.paymentForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isProcessing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      // Navigate to confirmation page with plan ID
      this.router.navigate(['/packages/confirmation'], {
        queryParams: { plan: this.selectedPlan.id }
      });
    }, 2000);
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    this.paymentForm.patchValue({ cardNumber: value }, { emitEvent: false });
  }

  formatExpirationDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentForm.patchValue({ expirationDate: value }, { emitEvent: false });
  }
}
