import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslatePipe } from '@ngx-translate/core';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  buttonText: string;
  buttonAction: string;
  highlighted?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    TranslatePipe
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'Free',
      features: [
        'packages.pricing.plans.basic.feature1',
        'packages.pricing.plans.basic.feature2'
      ],
      buttonText: 'packages.pricing.plans.basic.button',
      buttonAction: 'start'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      period: 'Per month',
      features: [
        'packages.pricing.plans.pro.feature1',
        'packages.pricing.plans.pro.feature2',
        'packages.pricing.plans.pro.feature3'
      ],
      buttonText: 'packages.pricing.plans.pro.button',
      buttonAction: 'subscribe',
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0,
      period: 'Contact Us',
      features: [
        'packages.pricing.plans.enterprise.feature1',
        'packages.pricing.plans.enterprise.feature2',
        'packages.pricing.plans.enterprise.feature3'
      ],
      buttonText: 'packages.pricing.plans.enterprise.button',
      buttonAction: 'contact'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'packages.pricing.faq.q1.question',
      answer: 'packages.pricing.faq.q1.answer'
    },
    {
      question: 'packages.pricing.faq.q2.question',
      answer: 'packages.pricing.faq.q2.answer'
    },
    {
      question: 'packages.pricing.faq.q3.question',
      answer: 'packages.pricing.faq.q3.answer'
    }
  ];

  constructor(private router: Router) {}

  onSelectPlan(plan: PricingPlan): void {
    if (plan.buttonAction === 'subscribe') {
      // Navigate to payment page with selected plan ID
      this.router.navigate(['/packages/payment'], { 
        queryParams: { plan: plan.id } 
      });
    } else if (plan.buttonAction === 'start') {
      // Start with free plan (could redirect to dashboard)
      console.log('Starting with free plan');
    } else if (plan.buttonAction === 'contact') {
      // Contact sales (could open contact form or redirect)
      console.log('Contact sales');
    }
  }
}
