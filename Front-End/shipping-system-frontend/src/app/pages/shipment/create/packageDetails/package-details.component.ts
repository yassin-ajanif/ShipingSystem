import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss'
})
export class PackageDetailsComponent {
  packageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.packageForm = this.fb.group({
      packageName: ['', [Validators.required]],
      packageType: ['', [Validators.required]],
      length: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      width: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      height: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      contentsDescription: ['', [Validators.required]],
      specialHandling: this.fb.group({
        fragile: [false],
        handleWithCare: [false],
        keepDry: [false]
      })
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.packageForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    
    if (field?.hasError('pattern')) {
      return 'Please enter a valid number';
    }
    
    return '';
  }

  getPackageData() {
    return this.packageForm.value;
  }

  isValid(): boolean {
    return this.packageForm.valid;
  }
}
