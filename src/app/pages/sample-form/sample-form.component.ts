import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import {
  FormService,
  FormTypes,
} from 'src/app/services/apiService/form-service.service';
export interface StepItem {
  title: string;
  clickEvent?: (item: StepItem) => void;
  status: boolean;
}

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SampleFormComponent implements OnInit, OnDestroy {
  formService = inject(FormService);
  private cdf = inject(ChangeDetectorRef);

  current: number = 0;
  prev: number = 0;

  listStepItem: StepItem[] = [];

  loadingStatus = new BehaviorSubject<boolean>(false);

  // clickEvent1(item: StepItem) {
  //   console.log('ev1 ');
  // }
  // clickEvent12(item: StepItem) {
  //   console.log('ev12 ');
  // }
  // clickEvent123(item: StepItem) {
  //   console.log('ev123 ');
  // }
  getFormSub = new Subscription();
  ngOnInit(): void {
    this.generateListStep();
    this.getFormSub = this.formService.getFormFromApi().subscribe();
  }

  ngOnDestroy(): void { }
  getFormValue() {
    console.log('______________form value___________________');
    console.log(this.formService.formInstance().value);
    console.log('__________________________________________');
  }

  prevStep() {
    console.log('next');
    if (this.current > 0) {
      this.current = this.current - 1;

      this.checkStatusButton(true);
    }
  }
  nextStep() {
    setTimeout(() => {
      if (this.current < this.listStepItem.length) {
        this.current = this.current + 1;
        this.checkStatusButton();
      }
    }, 1000);
  }
  checkStatusButton(isPrev = false, selectStep = false) {
    this.prev = this.current !== 0 ? this.current - 1 : 0;
    if (!isPrev) {
      this.listStepItem[this.current].status = true
      if (this.current === 1) {
        this.listStepItem[this.current - 1].status = true
      }
      // }
    }
  }

  gotoStep(index: number) {
    console.log(this.prev, this.current, index);
    if (
      this.listStepItem[index].status ||
      (index - 1 > 0 && this.listStepItem[index - 1].status)
    ) {
      this.current = index;
      this.checkStatusButton();
      return;
    }
    if (index > this.prev + 1 && this.current === 0) {
      return;
    }
    if (this.current + 1 < index) {
      return;
    }
    this.current = index;
    this.checkStatusButton();
  }

  generateListStep() {
    // {
    //   title: 'step1',
    //   // clickEvent: this.clickEvent1,
    //   status: false,
    // }, {
    //   title: 'step12',
    //   // clickEvent: this.clickEvent12,
    //   status: false,
    // }, {
    //   title: 'step13',
    //   // clickEvent: this.clickEvent123,
    //   status: false,
    // },
    for (let i = 0; i < 10; i++) {
      this.listStepItem.push({
        title: 'step' + i,
        // clickEvent: this.clickEvent1234,
        status: false,
      });
    }
  }
}
