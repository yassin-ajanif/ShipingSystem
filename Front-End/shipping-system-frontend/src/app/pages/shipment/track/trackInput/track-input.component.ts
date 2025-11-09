import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-track-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './track-input.component.html',
  styleUrl: './track-input.component.scss'
})
export class TrackInputComponent {
  trackingForm: FormGroup;
  isLoading: boolean = false;

  // Sample valid tracking numbers
  private validTrackingNumbers = ['123456789'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
    });
  }

  onTrack(): void {
    if (this.trackingForm.invalid) {
      return;
    }

    this.isLoading = true;
    const trackingNumber = this.trackingForm.get('trackingNumber')?.value;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      
      if (this.validTrackingNumbers.includes(trackingNumber)) {
        // Navigate to results page with tracking number
        this.router.navigate(['/shipments/track/results', trackingNumber]);
      } else {
        // Navigate to not found page
        this.router.navigate(['/shipments/track/not-found']);
      }
    }, 1000);
  }
}
