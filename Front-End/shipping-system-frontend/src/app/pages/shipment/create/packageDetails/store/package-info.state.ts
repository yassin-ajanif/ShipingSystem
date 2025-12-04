import { shippingTypeDto } from '../../../../../models/shippingTypeDto';

export interface PackageInfoState {
  packageName: string;
  shippingTypeId: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  contentsDescription: string;
  isValid: boolean;
  shippingTypes: shippingTypeDto[];
  shippingTypesLoading: boolean;
  shippingTypesError: string | null;
}

export const initialPackageInfoState: PackageInfoState = {
  packageName: '',
  shippingTypeId: '',
  length: '',
  width: '',
  height: '',
  weight: '',
  contentsDescription: '',
  isValid: false,
  shippingTypes: [],
  shippingTypesLoading: false,
  shippingTypesError: null
};
