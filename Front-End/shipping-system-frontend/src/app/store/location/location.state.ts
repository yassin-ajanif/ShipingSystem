import { cityDto } from '../../pages/shipment/create/senderInfo/dtos/cityDto';
import { countryDto } from '../../pages/shipment/create/senderInfo/dtos/countryDto';

export interface LocationState {
  countries: countryDto[];
  cities: cityDto[];
  currentCountryId: string | null;
  loading: boolean;
  error: string | null;
}

export const initialLocationState: LocationState = {
  countries: [],
  cities: [],
  currentCountryId: null,
  loading: false,
  error: null
};
