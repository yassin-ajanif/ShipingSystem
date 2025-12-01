import { initialSenderInfoState, SenderInfoState } from "../senderInfo/store/sender-info.state";
import { initialRecipientInfoState, RecipientInfoState } from "../recipientInfo/store/recipient-info.state";
import { initialPackageInfoState, PackageInfoState } from "../packageDetails/store/package-info.state";
import { initialPaymentMethodState, PaymentMethodState } from "../paymentMethod/store/payment-method.state";

export interface CreateState {
  isNextBtnEnabled: boolean;
  senderInfo : SenderInfoState;
  recipientInfo: RecipientInfoState;
  packageInfo: PackageInfoState;
  paymentMethod: PaymentMethodState;
}

export const initialCreateState: CreateState = {
  senderInfo:initialSenderInfoState,
  recipientInfo: initialRecipientInfoState,
  packageInfo: initialPackageInfoState,
  paymentMethod: initialPaymentMethodState,
  isNextBtnEnabled: false
};
