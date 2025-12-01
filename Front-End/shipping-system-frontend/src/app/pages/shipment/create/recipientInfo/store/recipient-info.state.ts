import { cityDto } from '../../../../../models/cityDto';

export interface RecipientInfoState {
  recipientName: string;
  address: string;
  cityId: string;
  countryId: string;
  citiesByLoadedByCountryId: cityDto[];
  phoneNumber: string;
  email: string;
  isValid: boolean;
}

export const initialRecipientInfoState: RecipientInfoState = {
  recipientName: '',
  address: '',
  cityId: '',
  countryId: '',
  citiesByLoadedByCountryId: [],
  phoneNumber: '',
  email: '',
  isValid: false
};
