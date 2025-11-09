import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';

interface TrackingEvent {
  status: string;
  date: string;
  icon: string;
}

interface TrackingDetails {
  trackingNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  statusProgress: number;
  timeline: TrackingEvent[];
}

@Component({
  selector: 'app-track-results',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    TranslatePipe
  ],
  templateUrl: './track-results.component.html',
  styleUrl: './track-results.component.scss'
})
export class TrackResultsComponent implements OnInit {
  trackingForm: FormGroup;
  trackingDetails: TrackingDetails | null = null;
  isLoading: boolean = false;

  // Sample tracking data
  private sampleData: { [key: string]: TrackingDetails } = {
    '123456789': {
      trackingNumber: '123456789',
      orderDate: 'July 15, 2024',
      estimatedDelivery: 'July 20, 2024',
      currentStatus: 'In Transit',
      statusProgress: 60,
      timeline: [
        { status: 'Order Placed', date: 'July 15, 2024', icon: 'check_circle' },
        { status: 'Shipped', date: 'July 16, 2024', icon: 'local_shipping' },
        { status: 'In Transit', date: 'July 17, 2024', icon: 'navigation' },
      ]
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Get tracking number from route params
    this.route.params.subscribe(params => {
      const trackingNumber = params['trackingNumber'];
      if (trackingNumber) {
        this.trackingForm.patchValue({ trackingNumber });
        this.loadTrackingDetails(trackingNumber);
      }
    });
  }

  private loadTrackingDetails(trackingNumber: string): void {
    const details = this.sampleData[trackingNumber];
    if (details) {
      this.trackingDetails = details;
    }
  }

  onTrack(): void {
    if (this.trackingForm.invalid) {
      return;
    }

    this.isLoading = true;
    const trackingNumber = this.trackingForm.get('trackingNumber')?.value;

    setTimeout(() => {
      this.isLoading = false;
      
      if (this.sampleData[trackingNumber]) {
        this.router.navigate(['/shipments/track/results', trackingNumber]);
      } else {
        this.router.navigate(['/shipments/track/not-found']);
      }
    }, 1000);
  }
}
