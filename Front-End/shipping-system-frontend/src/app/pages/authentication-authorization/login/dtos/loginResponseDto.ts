export interface loginResponseDto {
  success: boolean;
  userId: string;
  firstName: string;
  accessToken: string;
  refreshToken: string;
  message?: string;
  errors?: string[] | null;
}
