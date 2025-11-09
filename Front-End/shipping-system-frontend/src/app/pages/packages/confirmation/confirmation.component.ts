import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  selectedPlan: any = null;
  subscriptionStartDate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get plan ID from query params
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
        // If no plan data, redirect to pricing
        this.router.navigate(['/packages/pricing']);
        return;
      }
    });

    // Set subscription start date
    this.subscriptionStartDate = this.formatDate(new Date());
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  onManageSubscription(): void {
    // Navigate to subscription management page
    console.log('Manage subscription');
  }

  onBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
