import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

interface RateCalculation {
  distance: number;
  weight: number;
  ratePerKm: number;
  ratePerKg: number;
  distanceCost: number;
  weightCost: number;
  totalRate: number;
}

@Component({
  selector: 'app-calculate',
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
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent {
  rateForm: FormGroup;
  showResults: boolean = false;
  calculation: RateCalculation | null = null;
  isCalculating: boolean = false;

  // Sample rates (in a real app, these would come from an API)
  private readonly RATE_PER_KM = 0.50; // $0.50 per kilometer
  private readonly RATE_PER_KG = 2.00; // $2.00 per kilogram

  constructor(private fb: FormBuilder) {
    this.rateForm = this.fb.group({
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.min(0.1)]]
    });
  }

  onCalculate(): void {
    if (this.rateForm.invalid) {
      return;
    }

    this.isCalculating = true;

    // Simulate API call for calculating distance and rate
    setTimeout(() => {
      // In a real app, you would call a geocoding API to calculate actual distance
      // For demo purposes, we'll use a random distance between 50-500 km
      const distance = Math.floor(Math.random() * 450) + 50;
      const weight = this.rateForm.get('weight')?.value;

      const distanceCost = distance * this.RATE_PER_KM;
      const weightCost = weight * this.RATE_PER_KG;
      const totalRate = distanceCost + weightCost;

      this.calculation = {
        distance,
        weight,
        ratePerKm: this.RATE_PER_KM,
        ratePerKg: this.RATE_PER_KG,
        distanceCost,
        weightCost,
        totalRate
      };

      this.showResults = true;
      this.isCalculating = false;
    }, 1500);
  }

  onConfirm(): void {
    // Handle confirmation - navigate to create shipment or save quote
    console.log('Rate confirmed:', this.calculation);
  }

  onReset(): void {
    this.showResults = false;
    this.calculation = null;
    this.rateForm.reset();
  }
}
