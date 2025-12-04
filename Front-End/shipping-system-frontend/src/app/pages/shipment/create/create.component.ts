import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { AppState } from '../../../store/app.state';
import { select, Store } from '@ngrx/store';
import * as createShipmentSelectors from './store/create.selectors';
import { createShipment } from './store/create.actions';
import { CreateShippingRequestDto, mapCreateStateToRequest } from './dtos/create-shipping-request.dto';

interface Step {
  label: string;
  route: string;
  completed: boolean;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  currentStep: number = 0;
  progressValue: number = 0;
  store = inject(Store<AppState>);
  isNextBtnEnabled: Signal<boolean> = this.store.selectSignal(createShipmentSelectors.selectIsNextEnabled); ;
  createState = this.store.selectSignal(createShipmentSelectors.selectCreateState);

  steps: Step[] = [
    { label: 'shipmentCreate.steps.senderInformation', route: 'senderInfo', completed: false },
    { label: 'shipmentCreate.steps.recipientInformation', route: 'recipientInfo', completed: false },
    { label: 'shipmentCreate.steps.packageDetails', route: 'packageDetails', completed: false },
    { label: 'shipmentCreate.steps.paymentMethod', route: 'paymentMethod', completed: false }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Get current route and set active step
    this.activatedRoute.firstChild?.url.subscribe(urlSegments => {
      if (urlSegments && urlSegments.length > 0) {
        const currentRoute = urlSegments[0].path;
        const stepIndex = this.steps.findIndex(step => step.route === currentRoute);
        if (stepIndex !== -1) {
          this.currentStep = stepIndex;
          this.updateProgress();
        }
      } else {
        // Default to first step
        this.navigateToStep(0);
      }
    });
  }

  onNext(): void {
    // Mark current step as completed
    this.steps[this.currentStep].completed = true;

    // Move to next step
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.navigateToStep(this.currentStep);
    } else {
      this.whenUserIsAtTheLastStep();
    }
  }

  onPrevious(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.navigateToStep(this.currentStep);
    }
  }

  navigateToStep(stepIndex: number): void {
    this.currentStep = stepIndex;
    this.updateProgress();
    this.router.navigate([this.steps[stepIndex].route], { 
      relativeTo: this.activatedRoute 
    });
  }

  updateProgress(): void {
    this.progressValue = ((this.currentStep + 1) / this.steps.length) * 100;
  }

  isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }

  isFirstStep(): boolean {
    return this.currentStep === 0;
  }

  get currentStepLabel(): string {
    return this.steps[this.currentStep]?.label || '';
  }

  get stepIndicator(): string {
    return `Step ${this.currentStep + 1} of ${this.steps.length}`;
  }

  private whenUserIsAtTheLastStep(): void {
    const state = this.createState();
    if (!state) {
      return;
    }

    const request: CreateShippingRequestDto = mapCreateStateToRequest(state);
    this.store.dispatch(createShipment({ request }));
  }

  // Event handlers for child components
  handleViewShipmentDetails(): void {
    // Navigate to shipment details page
    this.router.navigate(['/shipments']);
  }

  handleBackToShipments(): void {
    // Navigate back to shipments list
    this.router.navigate(['/shipments']);
  }
}
