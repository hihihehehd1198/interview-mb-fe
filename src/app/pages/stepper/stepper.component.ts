
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
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
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, asyncScheduler, count, debounce, debounceTime, delay, distinctUntilChanged, exhaustMap, first, forkJoin, from, fromEvent, interval, observeOn, of, take, tap, throttle, throttleTime, timer } from 'rxjs';
import {
  FormService,
  FormTypes,
} from 'src/app/services/apiService/form-service.service';
import { StepperService } from './service/stepper.service';
export enum StepEventType {
  UNDEFINED = "undefined",
  FUNCTION = "function"
}
export interface StepItem {
  title: string;
  status: boolean;
}



@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterViewInit {





  private cdf = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2)
  private el = inject(ElementRef)
  stepperService = inject(StepperService)
  ngZone = inject(NgZone)

  @ViewChildren('lineStep') lineStep!: QueryList<HTMLDivElement>
  @ViewChild('stepperBackground') stepperBackground!: TemplateRef<HTMLDivElement>


  renderStreamLayout = new Subject<any>();

  blacklistItemLast: number[] = []
  lineWidth: string = 'unset';

  column: number = 0
  row: number = 0

  resizeStream = fromEvent(window, 'resize').pipe(exhaustMap(_ => interval(0).pipe(tap(_ => this.getSizeItem()), take(100)))).subscribe()
  renderChangedectionStream = fromEvent(document, 'click').pipe(exhaustMap(_ => interval(0).pipe(tap(_ => this.getSizeItem()), take(100)))).subscribe()

  getSizeItem() {
    this.blacklistItemLast = []
    console.log('trigger event !');

    const backgroundElement = document.querySelector('.stepper-background')!
    // console.log(backgroundElement)
    const minSizeString = window.getComputedStyle(backgroundElement).gridTemplateColumns?.toString().split(' ')[0]
    this.row = window.getComputedStyle(backgroundElement).gridTemplateRows?.toString().split(' ').length - 1
    const minSize = Number.parseInt(minSizeString.substring(0, minSizeString.length))

    this.column = Number.parseInt((backgroundElement.clientWidth / minSize).toString())

    // calculator line distict 2 item
    this.lineWidth = `calc(${backgroundElement.clientWidth / this.column}px - 50px)`
    // this.lineWidth = '1000px'
    // console.log()


    this.createBackList()
    // console.log('testing', this.column, minSize, this.lineWidth, this.row)
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


  checkLineAfter(index: number): boolean {
    if (index === this.stepperService.listStepItem.length - 1) return false;
    let result = true
    for (let i = 0; i < this.blacklistItemLast.length; i++) {

      if (index === (this.blacklistItemLast[i])) {
        result = false;
        break;
      }
    }
    return result
  }
  checkLineBefore(index: number): boolean {
    let count = 0
    while (count <= this.row) {
      if (count * this.column == index) {
        return false;
      }
      count++
    }
    return true;
  }
  ngOnInit(): void {
    this.stepperService.generateListStep();


    // forkJoin([this.resizeStream, this.renerdChangedectionStream]).pipe(
    //   exhaustMap(_ => interval(2).pipe(tap(_ => this.getSizeItem()), take(200)))
    // ).subscribe()
  }

  ngAfterViewInit(): void {
    this.getSizeItem()
  }
  ngOnDestroy(): void {
    this.renderStreamLayout.unsubscribe()
    this.resizeStream.unsubscribe()
    this.renderChangedectionStream.unsubscribe()
  }


}
