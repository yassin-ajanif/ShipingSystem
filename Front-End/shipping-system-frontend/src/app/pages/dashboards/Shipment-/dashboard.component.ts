import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface Shipment {
  trackingNumber: string;
  status: 'In Transit' | 'Delivered' | 'Pending';
  destination: string;
  estimatedDelivery: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName = 'Sarah'; // This would come from authentication service
  
  statCards: StatCard[] = [
    {
      title: 'dashboard.stats.activeShipments',
      value: 23,
      change: '+10%',
      changeType: 'positive'
    },
    {
      title: 'dashboard.stats.accountBalance',
      value: '$1,250.00',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'dashboard.stats.packagesInTransit',
      value: 15,
      change: '+20%',
      changeType: 'positive'
    }
  ];

  recentShipments: Shipment[] = [
    {
      trackingNumber: '1ZABC123456789123',
      status: 'In Transit',
      destination: 'New York, NY',
      estimatedDelivery: 'July 20, 2024'
    },
    {
      trackingNumber: '1ZDEF456789123456',
      status: 'Delivered',
      destination: 'Los Angeles, CA',
      estimatedDelivery: 'July 15, 2024'
    },
    {
      trackingNumber: '1ZGH789123456789',
      status: 'Pending',
      destination: 'Chicago, IL',
      estimatedDelivery: 'July 25, 2024'
    },
    {
      trackingNumber: '1ZJKL012345678012',
      status: 'In Transit',
      destination: 'Houston, TX',
      estimatedDelivery: 'July 22, 2024'
    },
    {
      trackingNumber: '1ZMNO345678912345',
      status: 'Delivered',
      destination: 'Phoenix, AZ',
      estimatedDelivery: 'July 10, 2024'
    }
  ];

  displayedColumns: string[] = ['trackingNumber', 'status', 'destination', 'estimatedDelivery', 'actions'];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Initialize component
  }

  onCreateShipment(): void {
    console.log('Create Shipment clicked');
    // TODO: Navigate to create shipment page
  }

  onViewAllShipments(): void {
    console.log('View All Shipments clicked');
    // TODO: Navigate to all shipments page
  }

  onViewDetails(shipment: Shipment): void {
    console.log('View Details clicked for:', shipment.trackingNumber);
    // TODO: Navigate to shipment details page
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Transit':
        return 'status-in-transit';
      case 'Delivered':
        return 'status-delivered';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  getChangeClass(changeType: string): string {
    switch (changeType) {
      case 'positive':
        return 'change-positive';
      case 'negative':
        return 'change-negative';
      default:
        return 'change-neutral';
    }
  }
}