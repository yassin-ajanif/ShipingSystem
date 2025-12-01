export interface PackageInfoState {
  packageName: string;
  packageType: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  contentsDescription: string;
  isValid: boolean;
}

export const initialPackageInfoState: PackageInfoState = {
  packageName: '',
  packageType: '',
  length: '',
  width: '',
  height: '',
  weight: '',
  contentsDescription: '',
  isValid: false
};
