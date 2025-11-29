export interface SenderInfoState {
  senderName: string;
  address: string;
  countryId: string;
  cityId: string;
  phoneNumber: string;
  email: string;
  isValid: boolean;
}

export const initialSenderInfoState: SenderInfoState = {
  senderName: '',
  address: '',
  countryId: '',
  cityId: '',
  phoneNumber: '',
  email: '',
  isValid: false
};
