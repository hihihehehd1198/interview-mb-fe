import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { FormService, FormTypes } from 'src/app/services/apiService/form-service.service';
export interface StepItem {
  title: string,
  clickEvent: (item: StepItem) => void
  status: boolean
}

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

  listStepItem: StepItem[] = [{
    title: 'step1',
    clickEvent: this.clickEvent1,
    status: false,
  }, {
    title: 'step12',
    clickEvent: this.clickEvent12,
    status: false,
  }, {
    title: 'step13',
    clickEvent: this.clickEvent123,
    status: false,
  }]


  clickEvent1(item: StepItem) {
    console.log('ev1 ')
  }
  clickEvent12(item: StepItem) {
    console.log('ev12 ')
  }
  clickEvent123(item: StepItem) {
    console.log('ev123 ')
  }
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
  checkStepStatusItem(item: StepItem, index: number): boolean {
    return false;
  }
  buttonClickStep(item: StepItem, index: number): void {
    // this.listStepItem.forEach((a, b) => {
    //   a.status = (b !== index ? a.status : true)
    // })
    this.current = index
  }

  current: number = 0
  prev: number = 0
  prevStep() {
    console.log('next')
    this.current = this.current - 1

    this.checkStatusButton()
  }
  nextStep() {


    this.current = this.current + 1
    // this.prev = this.current - 1
    this.checkStatusButton()
  }
  checkStatusButton() {
    console.log('prev', this.current, this.prev)
    this.prev = this.current - 1
    this.listStepItem.forEach((item: StepItem, index: number) => {
      switch (true) {
        case (index > this.prev):
          item.status = false
          break;

        case (index <= this.prev):
          item.status = true
          break;

        case (index !== this.current && this.current < this.prev):
          item.status = true
          break;
        case (index === this.current):
          item.status = false
          break;
      }
    })
  }
}
