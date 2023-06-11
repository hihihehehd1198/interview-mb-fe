
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
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
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, asyncScheduler, count, debounce, debounceTime, delay, distinctUntilChanged, first, from, interval, observeOn, of, take, tap, throttle, throttleTime, timer } from 'rxjs';
import {
  FormService,
  FormTypes,
} from 'src/app/services/apiService/form-service.service';
import { StepperService } from '../stepper/service/stepper.service';
export enum StepEventType {
  UNDEFINED = "undefined",
  FUNCTION = "function"
}
export interface StepItem {
  title: string;
  status: boolean;
}


@Component({
  selector: 'app-stpper-flex',
  templateUrl: './stpper-flex.component.html',
  styleUrls: ['./stpper-flex.component.scss']
})
export class StpperFlexComponent implements AfterViewInit {
  private cdf = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2)
  private el = inject(ElementRef)
  stepperService = inject(StepperService)
  ngZone = inject(NgZone)
  column = 0;
  row = 0;
  lineWidth = '';

  @ViewChildren('lineStep') lineStep!: QueryList<HTMLDivElement>
  @ViewChild('stepperBackground') stepperBackground!: TemplateRef<HTMLDivElement>
  blacklistItemLast: number[] = [];
  constructor() {
    this.stepperService.generateListStep()
  }

  checkLineAfter(index: number): boolean {
    if (index === this.stepperService.listStepItem.length - 1) return false
    return true;
  }


  @HostListener('window:resize', ['$event'])
  getSizeItem() {
    // console.log('resize___________________')
    console.log('trigger event !');

    const backgroundElement = document.querySelector('.stepper-background')!


    const flexItem = document.querySelector('.stepper-group') as any;
    const computedStyle = window.getComputedStyle(flexItem);
    const widthIncludingMargin = flexItem.getBoundingClientRect().width + parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
    console.log(widthIncludingMargin);



    const flexItems = Array.from(backgroundElement.querySelectorAll('.stepper-group'));

    // Get the width of the flex container
    const containerWidth = backgroundElement.getBoundingClientRect().width;

    // Get the width of a single flex item (assuming all items have the same width)
    const flexItemWidth = flexItems[0].clientWidth;

    // Calculate the number of columns
    const columnCount = Math.floor(Number.parseInt(containerWidth.toString()) / Number.parseInt(flexItemWidth.toString()));
    console.log("columnCount", columnCount - 1, containerWidth, backgroundElement.getBoundingClientRect())

    this.createBackList()
    this.cdf.detectChanges()
  }

  createBackList() {

    // console.log(this.stepperService.listStepItem.length - 1)
    // console.log(this.column)
    let count = 0;
    do {
      if (count > 0 && count % (this.column) === 0 && count / this.column > 0) {
        this.blacklistItemLast.push(count - 1)
      }
      count++;
    }
    while (count < this.stepperService.listStepItem.length)
    // console.log(this.blacklistItemLast)
  }
  ngAfterViewInit(): void {
    this.getSizeItem()
  }
}
