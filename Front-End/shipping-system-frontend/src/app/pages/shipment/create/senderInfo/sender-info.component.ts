import { Component, OnInit, Signal, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { startWith } from 'rxjs/operators';
import { AppState } from '../../../../store/app.state';
import { loadCities, loadCountries } from '../../../../store/location/location.actions';
import { selectCities, selectCountries } from '../../../../store/location/location.selectors';
import { countryDto } from './dtos/countryDto';
import { cityDto } from './dtos/cityDto';
import { toSignal } from '@angular/core/rxjs-interop';
import { setSenderInfoValidity } from './store/sender-info.actions';
import { selectIsNextEnabled } from '../store/create.selectors';
import { setNextBtnEnabled } from '../store/create.actions';

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
export class SenderInfoComponent implements OnInit {
  senderForm: FormGroup ;
 
  private store = inject(Store<AppState>);
  readonly countries: Signal<countryDto[]> = this.store.selectSignal(selectCountries);
  readonly cities: Signal<cityDto[]> = this.store.selectSignal(selectCities);
  countryId!: Signal<string>;
  senderInfoValid!: Signal<string>;

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
    this.checkTheValidityOfSenderInfo()
    this.whenTheCountryIdIsChangedLoadCities()
    this.whenTheSenderInfoValidityChangesDispatchItToStore()

   }

  ngOnInit(): void {
    this.store.dispatch(loadCountries());
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
      this.senderForm.statusChanges.pipe(startWith(this.senderForm.status)),
      { initialValue: this.senderForm.status }
    );
  }

  whenTheCountryIdIsChangedLoadCities(){
 effect(() => {
      
      const countryId = this.countryId();
      // Reset city selection on country change
     this.senderForm.patchValue({ cityId: '' }, { emitEvent: true });
      if (this.countryId()) {
        this.store.dispatch(loadCities({ countryId }));
      }  });

 
  }

  whenTheSenderInfoValidityChangesDispatchItToStore(){
 effect(() => {
      

      const isValid = this.senderInfoValid() === 'VALID';
      this.store.dispatch(setSenderInfoValidity({ isValid }));
      // we enable the next btn that lives in the parent createshipmenet component
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
