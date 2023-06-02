import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { FormService, FormTypes } from 'src/app/services/apiService/form-service.service';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SampleFormComponent implements OnInit, OnDestroy {




  formService = inject(FormService)
  private cdf = inject(ChangeDetectorRef)
  getFormSub = new Subscription()
  ngOnInit(): void {
    this.getFormSub = this.formService.getFormFromApi().subscribe()
  }
  ngOnDestroy(): void {

  }
  getFormValue() {
    console.log('______________form value___________________')
    console.log(this.formService.formInstance().value)
    console.log('__________________________________________')
  }
}
