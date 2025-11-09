import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-track-not-found',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './track-not-found.component.html',
  styleUrl: './track-not-found.component.scss'
})
export class TrackNotFoundComponent {
  trackingForm: FormGroup;
  isLoading: boolean = false;

  private validTrackingNumbers = ['123456789'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required]]
    });
  }

  onTryAgain(): void {
    if (this.trackingForm.invalid) {
      return;
    }

    this.isLoading = true;
    const trackingNumber = this.trackingForm.get('trackingNumber')?.value;

    setTimeout(() => {
      this.isLoading = false;
      
      if (this.validTrackingNumbers.includes(trackingNumber)) {
        this.router.navigate(['/shipments/track/results', trackingNumber]);
      } else {
        // Stay on not found page or show error
        this.trackingForm.reset();
      }
    }, 1000);
  }

  onContactSupport(): void {
    // Navigate to support page or open contact form
    console.log('Contact support clicked');
  }
}
