import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-return-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    TranslatePipe
  ],
  templateUrl: './return-details.component.html',
  styleUrl: './return-details.component.scss'
})
export class ReturnDetailsComponent {
  returnDetailsForm: FormGroup;

  returnAddresses: string[] = [
    '123 Main Street, Anytown, USA 12345',
    '456 Oak Avenue, Springfield, USA 67890',
    '789 Pine Road, Riverside, USA 11223'
  ];

  pickupLocations: string[] = [
    'Main Warehouse - 123 Industrial Blvd',
    'Downtown Store - 456 Market Street',
    'East Side Center - 789 Commerce Ave'
  ];

  shippingOptions = [
    {
      value: 'standard',
      label: 'Standard Return',
      description: 'Estimated delivery: 5-7 business days',
      cost: 10.00
    },
    {
      value: 'express',
      label: 'Express Return',
      description: 'Estimated delivery: 2-3 business days',
      cost: 25.00
    }
  ];

  constructor(private fb: FormBuilder) {
    this.returnDetailsForm = this.fb.group({
      returnAddress: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      shippingOption: ['standard', Validators.required]
    });
  }

  getSelectedShippingCost(): number {
    const selectedOption = this.returnDetailsForm.get('shippingOption')?.value;
    const option = this.shippingOptions.find(opt => opt.value === selectedOption);
    return option?.cost || 0;
  }

  getReturnShippingCost(): number {
    // This would typically be calculated based on the items being returned
    return 5.00;
  }

  getTotalReturnCost(): number {
    return this.getSelectedShippingCost() + this.getReturnShippingCost();
  }

  isValid(): boolean {
    return this.returnDetailsForm.valid;
  }

  getReturnDetailsData() {
    return {
      ...this.returnDetailsForm.value,
      shippingCost: this.getSelectedShippingCost(),
      returnShippingCost: this.getReturnShippingCost(),
      totalCost: this.getTotalReturnCost()
    };
  }
}
