import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';

interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  selected: boolean;
}

@Component({
  selector: 'app-return-items',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    TranslatePipe
  ],
  templateUrl: './return-items.component.html',
  styleUrl: './return-items.component.scss'
})
export class ReturnItemsComponent {
  returnForm: FormGroup;
  displayedColumns: string[] = ['item', 'quantity', 'price'];
  
  // Sample shipment data - in real app, this would come from a service
  shipmentNumber: string = '#12345';
  items: ShipmentItem[] = [
    { id: '1', name: 'Cozy Knit Sweater', quantity: 1, price: 49.99, selected: false },
    { id: '2', name: 'Classic Blue Jeans', quantity: 1, price: 59.99, selected: false },
    { id: '3', name: 'Leather Ankle Boots', quantity: 1, price: 89.99, selected: false }
  ];

  returnReasons: string[] = [
    'Wrong size',
    'Wrong item received',
    'Damaged or defective',
    'Changed my mind',
    'Better price found elsewhere',
    'Quality not as expected',
    'No longer needed',
    'Other'
  ];

  constructor(private fb: FormBuilder) {
    this.returnForm = this.fb.group({
      returnReason: [''],
      comments: ['']
    });
  }

  toggleItemSelection(item: ShipmentItem): void {
    item.selected = !item.selected;
  }

  getSelectedItems(): ShipmentItem[] {
    return this.items.filter(item => item.selected);
  }

  isValid(): boolean {
    return this.getSelectedItems().length > 0 && this.returnForm.get('returnReason')?.value;
  }

  getReturnData() {
    return {
      items: this.getSelectedItems(),
      returnReason: this.returnForm.get('returnReason')?.value,
      comments: this.returnForm.get('comments')?.value
    };
  }
}
