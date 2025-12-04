import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../../../models/api-response.model';
import { loginRequestDto } from '../login/dtos/loginRequestDto';
import { loginResponseDto } from '../login/dtos/loginResponseDto';
import { userSubscriptionDetailsDto } from '../login/dtos/userSubscriptionDetailsDto';

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
  private readonly userUrl = `${API_BASE_URL}/User`;

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

  getUserSubscription(userId: string): Observable<userSubscriptionDetailsDto | null> {
    return this.http
      .get<ApiResponse<userSubscriptionDetailsDto>>(`${this.userUrl}/${userId}/subscription`, {
        withCredentials: true
      })
      .pipe(
        map(response => response.data ?? null),
        catchError(error => {
          if (error?.status === 404) {
            return of(null);
          }
          return throwError(() => error);
        })
      );
  }
}
