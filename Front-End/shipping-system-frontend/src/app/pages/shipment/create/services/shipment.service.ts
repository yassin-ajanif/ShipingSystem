import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../models/api-response.model';
import { CreateShippingRequestDto } from '../dtos/create-shipping-request.dto';

const API_BASE_URL = 'http://localhost:5036/api';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private readonly shipmentUrl = `${API_BASE_URL}/Shipment`;

  constructor(private http: HttpClient) {}

  createShipment(request: CreateShippingRequestDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.shipmentUrl}/create`, request, {
      withCredentials: true
    });
  }
}
