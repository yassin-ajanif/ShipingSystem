import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sender-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './sender-info.component.html',
  styleUrl: './sender-info.component.scss'
})
export class SenderInfoComponent {
  senderForm: FormGroup;
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  countries: string[] = [
    'United States', 'Canada', 'Mexico', 'United Kingdom', 'France',
    'Germany', 'Italy', 'Spain', 'Australia', 'Japan', 'China',
    'India', 'Brazil', 'Argentina', 'South Africa', 'Egypt'
  ];

  constructor(private fb: FormBuilder) {
    this.senderForm = this.fb.group({
      senderName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.senderForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }

    if (field?.hasError('pattern')) {
      if (fieldName === 'phoneNumber') {
        return 'Please enter a valid phone number';
      }
      if (fieldName === 'zipCode') {
        return 'Please enter a valid zip code';
      }
      return 'Please enter a valid phone number';
    }

    return '';
  }

  getSenderData() {
    return this.senderForm.value;
  }

  isValid(): boolean {
    return this.senderForm.valid;
  }
}
