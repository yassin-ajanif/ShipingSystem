import { AfterViewInit, Component, OnInit, Signal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from '../../../../store/app.state';
import * as locationActions from '../../../../store/location/location.actions';
import * as locationSelectors from '../../../../store/location/location.selectors';
import { countryDto } from '../../../../models/countryDto';
import { cityDto } from '../../../../models/cityDto';
import { toSignal } from '@angular/core/rxjs-interop';
import * as senderInfoActions from './store/sender-info.actions';
import { setNextBtnEnabled } from '../store/create.actions';
import { SenderInfoState } from './store/sender-info.state';
import * as senderSelectors from './store/sender-info.selectors';

@Component({
  selector: 'app-sender-info',
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
  templateUrl: './sender-info.component.html',
  styleUrl: './sender-info.component.scss'
})
export class SenderInfoComponent implements OnInit , AfterViewInit{
  senderForm: FormGroup ;
 
  private store = inject(Store<AppState>);
  readonly countries: Signal<countryDto[]> = this.store.selectSignal(locationSelectors.selectCountries);
  readonly citiesOfSelectedCountry: Signal<cityDto[]> = this.store.selectSignal(senderSelectors.selectCitiesBySelectedCountry);
  readonly senderInfoFromStore: Signal<SenderInfoState> = this.store.selectSignal(senderSelectors.selectSenderInfo);
  // this value is true when we go back to this step or page component
  // isHydrating is false when the user land the first time to the page which means the 
  // store is empty of senderInfo data
  private isHydrating = !this.senderInfoStoreIsEmpty();


  countryId!: Signal<string>;
  senderInfoValid!: Signal<boolean>;
  senderInfoValue!: Signal<SenderInfoState>;

  constructor(private fb: FormBuilder) {

     this.senderForm = this.fb.group({
      senderName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  
  
    this.whenUserPickDifferentCountryGetItsId()
    this.whenAnyValueOfSenderFormInfoChangesGetItsValue()
    this.checkTheValidityOfSenderInfo()
    this.whenTheCountryIdIsChangedLoadCities()
    this.whenTheSenderInfoValidityChangesDispatchItToStore()
    
     
   }
  ngAfterViewInit(): void {
    
    this.isHydrating = false;
  }

  ngOnInit(): void {

  
    if(this.isHydrating) { this.loadSenderInfoFromStoreToForm(); }
    else {
       this.store.dispatch(locationActions.loadCountries());
    }
  }

  
  loadSenderInfoFromStoreToForm(){

    const senderInfo = this.senderInfoFromStore();
    if (senderInfo) {
      this.senderForm.patchValue({
        senderName: senderInfo.senderName || '',
        address: senderInfo.address || '',
        countryId: senderInfo.countryId || '',
        cityId: senderInfo.cityId || '',
        phoneNumber: senderInfo.phoneNumber || '',
        email: senderInfo.email || ''
      });
    }
  }

  // the senderinfo store is empty when the user land the first time to the page
  // while is false when he go back to this step or page component
  senderInfoStoreIsEmpty(): boolean {
    const senderInfo = this.senderInfoFromStore();
    if (!senderInfo) {
      return true;
    }

    const { senderName, address, countryId, cityId, phoneNumber, email } = senderInfo;
    return [
      senderName,
      address,
      countryId,
      cityId,
      phoneNumber,
      email
    ].every(value => !value || `${value}`.trim() === '');
  }

  whenUserPickDifferentCountryGetItsId(){
    this.countryId = toSignal(
      this.senderForm.get('countryId')!.valueChanges.pipe(
        startWith(this.senderForm.get('countryId')!.value)
      ),
      { initialValue: '' }
    );
  }

  checkTheValidityOfSenderInfo(){
    this.senderInfoValid = toSignal(
      this.senderForm.statusChanges.pipe(
        startWith(this.senderForm.status),
        // convert Angular status string to boolean
        // VALID | INVALID | PENDING | DISABLED
        map(status => status === 'VALID')
      ),
      { initialValue: this.senderForm.status === 'VALID' }
    ) as Signal<boolean>;

   
  }

  // this method makes the state of senderINfo in sync with the form values
  whenAnyValueOfSenderFormInfoChangesGetItsValue(){

     this.senderInfoValue = toSignal(
      this.senderForm.valueChanges.pipe(startWith(this.senderForm.value)),
      { initialValue: this.senderForm.value as SenderInfoState }
    );
  }

  whenTheCountryIdIsChangedLoadCities(){
 effect(() => {
      
      const countryId = this.countryId();
      // if the page is hydrating I mean is loading previous data from store 
      // don't load cities when don't need them
      if (this.isHydrating) {
        return; 
      }
      // Reset city selection on country change
     this.senderForm.patchValue({ cityId: '' }, { emitEvent: true });
      if (this.countryId()) {
        this.store.dispatch(senderInfoActions.loadCitiesBySelectedCountryId({ countryId }));
      }  });

      
  }

  whenTheSenderInfoValidityChangesDispatchItToStore(){
 effect(() => {
      

      const isValid = this.senderInfoValid();
      const senderInfo = this.senderInfoValue();
      this.store.dispatch(senderInfoActions.setSenderInfoValidity({ isValid }));
      this.store.dispatch(senderInfoActions.setSenderInfo({ senderInfo: { ...senderInfo, isValid } }));
      this.store.dispatch(setNextBtnEnabled({ isNextBtnEnabled: isValid }));
    });
  }

 

  getErrorMessage(fieldName: string): string {
    const field = this.senderForm.get(fieldName);
    
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
      return 'Please enter a valid phone number';
    }

    return '';
  }

}
