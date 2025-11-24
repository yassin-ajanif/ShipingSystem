import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

// Using the backend dev URL from launchSettings/swagger: http://localhost:5036
const API_BASE_URL = 'http://localhost:5036/api';

interface LoginRequest {
  email: string;
  password: string;
}

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

interface UserResult {
  success: boolean;
  firstName?: string;
  accessToken?: string;
  refreshToken?: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${API_BASE_URL}/Auth`;

  constructor(private http: HttpClient) {}

  // Login just triggers the backend; tokens are handled server-side (refresh in HttpOnly cookie).
  login(payload: LoginRequest): Observable<ApiResponse<UserResult>> {
    return this.http.post<ApiResponse<UserResult>>(`${this.authUrl}/login`, payload, {
      withCredentials: true
    });
  }

  signUp(payload: RegisterRequest): Observable<ApiResponse<UserResult>> {
    return this.http.post<ApiResponse<UserResult>>(`${this.authUrl}/register`, payload);
  }
}
