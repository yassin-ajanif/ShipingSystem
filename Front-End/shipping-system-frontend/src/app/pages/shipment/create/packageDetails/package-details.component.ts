import { Component, OnInit, Signal, effect, inject, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import * as packagesActions from './store/package-info.actions';
import { PackageInfoState } from './store/package-info.state';
import { setNextBtnEnabled, setSubscriptionPackageId } from '../store/create.actions';
import * as packageInfoSelectors from './store/package-info.selectors';
import { shippingTypeDto } from '../../../../models/shippingTypeDto';
import * as loginSelectors from '../../../authentication-authorization/login/store/login.selectors';
import * as loginActions from '../../../authentication-authorization/login/store/login.actions';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    TranslatePipe
  ],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss'
})
export class PackageDetailsComponent implements OnInit {
  packageForm: FormGroup;
  private store = inject(Store<AppState>);
  readonly packageInfoFromStore: Signal<PackageInfoState> = this.store.selectSignal(packageInfoSelectors.selectPackageInfoState);
  readonly shippingTypes: Signal<shippingTypeDto[]> = this.store.selectSignal(packageInfoSelectors.selectShippingTypes); 
  readonly shippingTypesLoading: Signal<boolean> = this.store.selectSignal(packageInfoSelectors.selectShippingTypesLoading);
  readonly userSubscriptionDetails = this.store.selectSignal(loginSelectors.selectSubscriptionDetails);
  readonly loggedInUser = this.store.selectSignal(loginSelectors.selectLoginState);
  private isHydrating = false;
  packageValid!: Signal<boolean>;
  packageValue!: Signal<PackageInfoState>;

 
  constructor(private fb: FormBuilder) {
    this.packageForm = this.fb.group({
      packageName: ['', [Validators.required]],
      shippingTypeId: ['', [Validators.required]],
      length: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      width: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      height: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      contentsDescription: ['', [Validators.required]]
    });

    this.whenAnyValueOfPackageFormChangesGetItsValue();
    this.checkTheValidityOfPackageInfo();
    this.whenPackageValidityChangesDispatchToStore();
    this.loadSubscriptionDetailsOfLoggedUser();
  }

  ngOnInit(): void {
    this.store.dispatch(packagesActions.loadShippingTypes());

    // this value is true when we go back to this step or page component
    // isHydrating is false when the user lands the first time to the page which means
    // the store is empty of packageInfo data
    this.isHydrating = !this.packageInfoStoreIsEmpty();

    if (this.isHydrating) {
      this.loadPackageInfoFromStoreToForm();
    }

    this.setSubscriptionIdOfLoggedUser();
  }

  private whenAnyValueOfPackageFormChangesGetItsValue(): void {
    this.packageValue = toSignal(
      this.packageForm.valueChanges.pipe(startWith(this.packageForm.value)),
      { initialValue: this.packageForm.value as PackageInfoState }
    );


    
  }

  // if the user is logged in and subscription details are not loaded yet, load them
  
  private loadSubscriptionDetailsOfLoggedUser(): void {
    const user = this.loggedInUser().user;
    const subscription = this.userSubscriptionDetails();

    if (!user) {
      return;
    }

    if (subscription === null) {

      this.store.dispatch(loginActions.loadUserSubscription({ userId:user.userId }) );
      
    }
  }

  private setSubscriptionIdOfLoggedUser(): void{
  
      const subscription = this.userSubscriptionDetails();
      if (subscription?.subscriptionId) {
        this.store.dispatch(setSubscriptionPackageId({ subscriptionPackageId: subscription.packageId }));
      }
    
  }


  private checkTheValidityOfPackageInfo(): void {
    this.packageValid = toSignal(
      this.packageForm.statusChanges.pipe(
        startWith(this.packageForm.status),
        map(status => status === 'VALID')
      ),
      { initialValue: this.packageForm.status === 'VALID' }
    ) as Signal<boolean>;
  }

  
  private whenPackageValidityChangesDispatchToStore(): void {
    effect(() => {
      const isValid = this.packageValid();
      const packageInfo = this.packageValue();
      this.store.dispatch(packagesActions.setPackageInfoValidity({ isValid }));
      this.store.dispatch(packagesActions.setPackageInfo({ packageInfo: { ...packageInfo, isValid } }));
      this.store.dispatch(setNextBtnEnabled({ isNextBtnEnabled: isValid }));
    });
  }


  private loadPackageInfoFromStoreToForm(): void {
    const packageInfo = this.packageInfoFromStore();
    if (packageInfo) {
      this.packageForm.patchValue({
        packageName: packageInfo.packageName || '',
        shippingTypeId: packageInfo.shippingTypeId || '',
        length: packageInfo.length || '',
        width: packageInfo.width || '',
        height: packageInfo.height || '',
        weight: packageInfo.weight || '',
        contentsDescription: packageInfo.contentsDescription || ''
      });
    }
  }

  private packageInfoStoreIsEmpty(): boolean {
    const packageInfo = this.packageInfoFromStore();
    if (!packageInfo) {
      return true;
    }

    const { packageName, shippingTypeId, length, width, height, weight, contentsDescription } = packageInfo;
    return [
      packageName,
      shippingTypeId,
      length,
      width,
      height,
      weight,
      contentsDescription
    ].every(value => !value || `${value}`.trim() === '');
  }
}
