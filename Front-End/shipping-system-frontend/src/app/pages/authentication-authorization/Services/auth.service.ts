import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response.model';
import { loginRequestDto } from '../login/dtos/loginRequestDto';
import { loginResponseDto } from '../login/dtos/loginResponseDto';

// Using the backend dev URL from launchSettings/swagger: http://localhost:5036
const API_BASE_URL = 'http://localhost:5036/api';

interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  phone: string;
  role?: string | null;
  returnUrl?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${API_BASE_URL}/Auth`;

  constructor(private http: HttpClient) {}

  // Login just triggers the backend; tokens are handled server-side (refresh in HttpOnly cookie).
  login(payload: loginRequestDto): Observable<ApiResponse<loginResponseDto>> {
    return this.http.post<ApiResponse<loginResponseDto>>(`${this.authUrl}/login`, payload, {
      withCredentials: true
    });
  }

  signUp(payload: RegisterRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.authUrl}/register`, payload);
  }
}
