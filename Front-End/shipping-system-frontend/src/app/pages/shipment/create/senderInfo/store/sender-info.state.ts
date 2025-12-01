import { cityDto } from "../../../../../models/cityDto";

export interface SenderInfoState {
  senderName: string;
  address: string;
  countryId: string;
  cityId: string;
  citiesByLoadedByCountryId: cityDto[];
  phoneNumber: string;
  email: string;
  citiesLoading: boolean;
  citiesError: string | null;
  isValid: boolean;

}

export const initialSenderInfoState: SenderInfoState = {
  senderName: '',
  address: '',
  countryId: '',
  cityId: '',
  citiesByLoadedByCountryId: [],
  phoneNumber: '',
  email: '',
  citiesLoading: false,
  citiesError: null,
  isValid: false
};
