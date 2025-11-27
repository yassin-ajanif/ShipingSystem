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
  cities: string[] = [
    'Casablanca', 'Rabat', 'Marrakesh', 'Tangier', 'Fes', 'Agadir',
    'Kenitra', 'Tetouan', 'Safi', 'Oujda', 'Beni Mellal', 'Khouribga'
  ];

  countries: string[] = [
    'United States', 'Canada', 'Mexico', 'United Kingdom', 'France',
    'Germany', 'Italy', 'Spain', 'Australia', 'Japan', 'China', 'Morocco',
    'India', 'Brazil', 'Argentina', 'South Africa', 'Egypt'
  ];

  constructor(private fb: FormBuilder) {
    this.senderForm = this.fb.group({
      senderName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
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
