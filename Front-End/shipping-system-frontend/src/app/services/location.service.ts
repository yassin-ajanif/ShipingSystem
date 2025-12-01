import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { countryDto } from '../models/countryDto';
import { cityDto } from '../models/cityDto';

const API_BASE_URL = 'http://localhost:5036/api';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly countriesUrl = `${API_BASE_URL}/Countries`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<ApiResponse<countryDto[]>> {
    return this.http.get<ApiResponse<countryDto[]>>(this.countriesUrl);
  }

  getCities(countryId: string): Observable<ApiResponse<cityDto[]>> {
    return this.http.get<ApiResponse<cityDto[]>>(
      `${this.countriesUrl}/${countryId}/cities`
    );
  }
}
