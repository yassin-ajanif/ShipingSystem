import { AfterViewInit, Component, OnInit, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import { RecipientInfoState } from './store/recipient-info.state';
import * as recipientInfoActions from './store/recipient-info.actions';
import * as recipientInfoSelectors from './store/recipient-info.selectors';
import * as locationActions from '../../../../store/location/location.actions';
import * as locationSelectors from '../../../../store/location/location.selectors';
import { countryDto } from '../../../../models/countryDto';
import { cityDto } from '../../../../models/cityDto';
import { setNextBtnEnabled } from '../store/create.actions';

@Component({
  selector: 'app-recipient-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    TranslatePipe
  ],
  templateUrl: './recipient-info.component.html',
  styleUrl: './recipient-info.component.scss'
})
export class RecipientInfoComponent implements OnInit ,AfterViewInit {
  recipientForm: FormGroup;
  private store = inject(Store<AppState>);
  readonly countries: Signal<countryDto[]> = this.store.selectSignal(locationSelectors.selectCountries);
  readonly cities: Signal<cityDto[]> = this.store.selectSignal(recipientInfoSelectors.selectRecipientCitiesBySelectedCountry);
  //readonly cities!: Signal<cityDto[]>
  readonly recipientInfoFromStore: Signal<RecipientInfoState> = this.store.selectSignal(recipientInfoSelectors.selectRecipientInfoState);
  private isHydrating = !this.recipientInfoStoreIsEmpty();
  countryId!: Signal<string>;
  recipientValid!: Signal<boolean>;
  recipientValue!: Signal<RecipientInfoState>;

  constructor(private fb: FormBuilder) {
    this.recipientForm = this.fb.group({
      recipientName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.whenUserPickDifferentCountryGetItsId();
    this.whenAnyValueOfRecipientFormInfoChangesGetItsValue();
    this.checkTheValidityOfRecipientInfo();
    this.whenTheCountryIdIsChangedLoadCities();
    this.whenTheRecipientInfoValidityChangesDispatchItToStore();

    this.store.dispatch(locationActions.loadCountries());
  }

  ngOnInit(): void {
     if(this.isHydrating) { this.loadRecipientInfoFromStoreToForm(); }
    else {
       this.store.dispatch(locationActions.loadCountries());
    }
  }

  ngAfterViewInit(): void {
    this.isHydrating = false;
  }

  private whenUserPickDifferentCountryGetItsId(): void {
    this.countryId = toSignal(
      this.recipientForm.get('countryId')!.valueChanges.pipe(
        startWith(this.recipientForm.get('countryId')!.value)
      ),
      { initialValue: '' }
    );
  }

  private checkTheValidityOfRecipientInfo(): void {
    this.recipientValid = toSignal(
      this.recipientForm.statusChanges.pipe(
        startWith(this.recipientForm.status),
        map(status => status === 'VALID')
      ),
      { initialValue: this.recipientForm.status === 'VALID' }
    ) as Signal<boolean>;
  }

  private whenAnyValueOfRecipientFormInfoChangesGetItsValue(): void {
    this.recipientValue = toSignal(
      this.recipientForm.valueChanges.pipe(startWith(this.recipientForm.value)),
      { initialValue: this.recipientForm.value as RecipientInfoState }
    );
  }

  private whenTheCountryIdIsChangedLoadCities(): void {
    effect(() => {
      const countryId = this.countryId();
      if (this.isHydrating) return;
      this.recipientForm.patchValue({ cityId: '' }, { emitEvent: true });
      if (countryId) {
        this.store.dispatch(recipientInfoActions.loadRecipientCitiesBySelectedCountryId({ countryId }));
      }
    });
  }

  private whenTheRecipientInfoValidityChangesDispatchItToStore(): void {
    effect(() => {
      const isValid = this.recipientValid();
      const recipientInfo = this.recipientValue();
      this.store.dispatch(recipientInfoActions.setRecipientInfoValidity({ isValid }));
      this.store.dispatch(recipientInfoActions.setRecipientInfo({ recipientInfo: { ...recipientInfo, isValid } }));
      this.store.dispatch(setNextBtnEnabled({ isNextBtnEnabled: isValid }));
    });
  }

  private loadRecipientInfoFromStoreToForm(): void {
    
    const recipientInfo = this.recipientInfoFromStore();

    this.recipientForm.patchValue(
      {
        recipientName: recipientInfo.recipientName || '',
        address: recipientInfo.address || '',
        countryId: recipientInfo.countryId || '',
        cityId: recipientInfo.cityId || '',
        phoneNumber: recipientInfo.phoneNumber || '',
        email: recipientInfo.email || ''
      },
     
    );
  }

  private recipientInfoStoreIsEmpty(): boolean {
   
    const recipientInfo = this.recipientInfoFromStore();

    if (!recipientInfo) {
      return true;
    }
    const { recipientName, address, countryId, cityId, phoneNumber, email } = recipientInfo;
    return [
      recipientName,
      address,
      countryId,
      cityId,
      phoneNumber,
      email
    ].every(val => !val || `${val}`.trim() === '');
  }

  getErrorMessage(fieldName: string): string {
    const field = this.recipientForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    
    if (field?.hasError('pattern')) {
      if (fieldName === 'phoneNumber') {
        return 'Please enter a valid phone number';
      }
    }
    
    return '';
  }
}
