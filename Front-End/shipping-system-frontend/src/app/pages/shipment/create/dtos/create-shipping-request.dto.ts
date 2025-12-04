import { CreateState } from '../store/create.state';
import { SenderInfoState } from '../senderInfo/store/sender-info.state';
import { RecipientInfoState } from '../recipientInfo/store/recipient-info.state';
import { PackageInfoState } from '../packageDetails/store/package-info.state';

export interface UserSenderRequestDto {
  senderName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  cityId: string;
  cityName?: string | null;
}

export interface UserReceiverRequestDto {
  receiverName: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  cityId: string;
  cityName?: string | null;
}

export interface PackageInfoRequestDto {
  packageName: string;
  packageType?: string | null;
  length?: string | null;
  width?: string | null;
  height?: string | null;
  weight?: string | null;
  contentsDescription: string;
}

export interface CreateShippingRequestDto {
  senderId?: string | null;
  sender?: UserSenderRequestDto | null;
  receiverId?: string | null;
  receiver?: UserReceiverRequestDto | null;
  shippingTypeId?: string | null;
  paymentMethodId?: string | null;
  subscriptionPackageId?: string | null;
  packageInfo?: PackageInfoRequestDto;
}

const mapSender = (sender: SenderInfoState): UserSenderRequestDto => ({
  senderName: sender.senderName,
  email: sender.email ?? '',
  phone: sender.phoneNumber ?? '',
  address: sender.address ?? '',
  cityId: sender.cityId ?? '',
  cityName: null
});

const mapReceiver = (recipient: RecipientInfoState): UserReceiverRequestDto => ({
  receiverName: recipient.recipientName,
  email: recipient.email ?? '',
  phone: recipient.phoneNumber ?? '',
  address: recipient.address ?? '',
  cityId: recipient.cityId ?? '',
  cityName: null
});

const mapPackageInfo = (pkg: PackageInfoState): PackageInfoRequestDto => ({
  packageName: pkg.packageName,
  packageType: null,
  length: `${pkg.length ?? ''}`,
  width: `${pkg.width ?? ''}`,
  height: `${pkg.height ?? ''}`,
  weight: `${pkg.weight ?? ''}`,
  contentsDescription: pkg.contentsDescription
});

export function mapCreateStateToRequest(state: CreateState): CreateShippingRequestDto {
  const { senderInfo, recipientInfo, packageInfo, paymentMethod, subscriptionPackageId } = state;

  return {
    senderId: null,
    receiverId: null,
    sender: mapSender(senderInfo),
    receiver: mapReceiver(recipientInfo),
    shippingTypeId: packageInfo.shippingTypeId || state.shippingTypeId || null,
    paymentMethodId: paymentMethod.paymentMethodId || null,
    subscriptionPackageId: subscriptionPackageId || null,
    packageInfo: mapPackageInfo(packageInfo)
  };
}
