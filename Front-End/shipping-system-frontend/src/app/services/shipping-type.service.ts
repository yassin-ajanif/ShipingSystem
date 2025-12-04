import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { shippingTypeDto } from '../models/shippingTypeDto';

const API_BASE_URL = 'http://localhost:5036/api';

@Injectable({
  providedIn: 'root'
})
export class ShippingTypeService {
  private readonly shippingTypesUrl = `${API_BASE_URL}/ShippingTypes`;

  constructor(private http: HttpClient) {}

  getShippingTypes(): Observable<ApiResponse<shippingTypeDto[]>> {
    return this.http.get<ApiResponse<shippingTypeDto[]>>(this.shippingTypesUrl);
  }
}
