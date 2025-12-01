import { createSelector } from '@ngrx/store';
import { CreateState } from '../../store/create.state';
import { cityDto } from '../../../../../models/cityDto';

const selectCreateState = (state: { create: CreateState }) => state.create;

export const selectRecipientInfoState = createSelector(
  selectCreateState,
  (state) => state.recipientInfo
);

export const selectRecipientInfoValid = createSelector(
  selectRecipientInfoState,
  (state) => state.isValid
);

export const selectRecipientCitiesBySelectedCountry = createSelector(
  selectRecipientInfoState,
  (state): cityDto[] => state.citiesByLoadedByCountryId
);
