import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-return-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './return-confirmation.component.html',
  styleUrl: './return-confirmation.component.scss'
})
export class ReturnConfirmationComponent {
  @Output() viewReturnDetails = new EventEmitter<void>();
  @Output() backToShipments = new EventEmitter<void>();

  onViewReturnDetails(): void {
    this.viewReturnDetails.emit();
  }

  onBackToShipments(): void {
    this.backToShipments.emit();
  }
}
