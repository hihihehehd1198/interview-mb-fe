import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, Observable, Subscription, count, first, from, of, tap } from 'rxjs';
import {
  FormService,
  FormTypes,
} from 'src/app/services/apiService/form-service.service';
export enum StepEventType {
  UNDEFINED = "undefined",
  FUNCTION = "function"
}
export interface StepItem {
  title: string;
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
  private renderer = inject(Renderer2)

  getFormSub = new Subscription()

  ngOnDestroy(): void {
    this.getFormSub.unsubscribe()
  }


  getFormValue() {
    console.log('______________form value___________________');
    console.log(this.formService.formInstance().value);
    console.log('__________________________________________');
  }
  ngOnInit(): void {
    this.getFormSub = this.formService.getFormFromApi().subscribe();
  }
}
