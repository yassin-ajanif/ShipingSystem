import { Component, Signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import { setPackageInfo, setPackageInfoValidity } from './store/package-info.actions';
import { PackageInfoState } from './store/package-info.state';
import { setNextBtnEnabled } from '../store/create.actions';

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
    TranslatePipe
  ],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss'
})
export class PackageDetailsComponent {
  packageForm: FormGroup;
  private store = inject(Store<AppState>);
  packageValid!: Signal<boolean>;
  packageValue!: Signal<PackageInfoState>;

  constructor(private fb: FormBuilder) {
    this.packageForm = this.fb.group({
      packageName: ['', [Validators.required]],
      packageType: ['', [Validators.required]],
      length: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      width: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      height: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      weight: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      contentsDescription: ['', [Validators.required]]
    });

    this.whenAnyValueOfPackageFormChangesGetItsValue();
    this.checkTheValidityOfPackageInfo();
    this.whenPackageValidityChangesDispatchToStore();
  }

  private whenAnyValueOfPackageFormChangesGetItsValue(): void {
    this.packageValue = toSignal(
      this.packageForm.valueChanges.pipe(startWith(this.packageForm.value)),
      { initialValue: this.packageForm.value as PackageInfoState }
    );
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
      this.store.dispatch(setPackageInfoValidity({ isValid }));
      this.store.dispatch(setPackageInfo({ packageInfo: { ...packageInfo, isValid } }));
      this.store.dispatch(setNextBtnEnabled({ isNextBtnEnabled: isValid }));
    });
  }
}
