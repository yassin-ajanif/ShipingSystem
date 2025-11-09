import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-last-feedback',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslatePipe
  ],
  templateUrl: './last-feedback.component.html',
  styleUrl: './last-feedback.component.scss'
})
export class LastFeedbackComponent {
  @Output() viewShipmentDetails = new EventEmitter<void>();
  @Output() backToShipments = new EventEmitter<void>();

  onViewShipmentDetails(): void {
    this.viewShipmentDetails.emit();
  }

  onBackToShipments(): void {
    this.backToShipments.emit();
  }
}
