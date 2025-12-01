import { cityDto } from '../../models/cityDto';
import { countryDto } from '../../models/countryDto';

export interface LocationState {
  countries: countryDto[];
  currentCountryId: string | null;
  loading: boolean;
  error: string | null;
}

export const initialLocationState: LocationState = {
  countries: [],
  currentCountryId: null,
  loading: false,
  error: null
};
