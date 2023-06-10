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
import { BehaviorSubject, Subscription, count, first, tap } from 'rxjs';
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
export class SampleFormComponent implements OnInit, OnDestroy, AfterViewInit {

  formService = inject(FormService);
  private cdf = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2)
  current: number = 0;
  prev: number = 0;

  listStepItem: StepItem[] = [];

  @ViewChildren('lineStep') lineStep!: QueryList<HTMLDivElement>
  @ViewChild('stepperBackground') stepperBackground!: TemplateRef<HTMLDivElement>
  blacklistItemLast: number[] = []
  lineWidth: string = 'unset';

  column: number = 0
  row: number = 0
  @HostListener('window:resize')
  getSizeItem() {
    this.blacklistItemLast = []
    console.log('trigger event !');
    const backgroundElement = document.querySelector('.stepper-background')!
    console.log(backgroundElement)
    const minSizeString = window.getComputedStyle(backgroundElement).gridTemplateColumns?.toString().split(' ')[0]
    this.row = window.getComputedStyle(backgroundElement).gridTemplateRows?.toString().split(' ').length - 1
    const minSize = Number.parseInt(minSizeString.substring(0, minSizeString.length))

    this.column = Number.parseInt((backgroundElement.clientWidth / minSize).toString())

    // calculator line distict 2 item
    this.lineWidth = `calc(${55 / this.column}vw)`

    // tjos/
    this.createBackList()
    console.log('testing', this.column, minSize, this.lineWidth, this.row)
    this.cdf.detectChanges()
  }

  // createLines() {
  //   this.renderer.setProperty(containerElement, 'innerHTML', '');

  //   const itemsArray = this.items.toArray();
  //   for (let i = 0; i < itemsArray.length - 1; i++) {
  //     const currentItem = itemsArray[i].nativeElement;
  //     const nextItem = itemsArray[i + 1].nativeElement;

  //     const lineElement = this.renderer.createElement('div');
  //     this.renderer.addClass(lineElement, 'line');

  //     const distance = nextItem.offsetLeft - currentItem.offsetLeft;
  //     const width = Math.abs(distance) + currentItem.offsetWidth;
  //     const left = Math.min(currentItem.offsetLeft, nextItem.offsetLeft);

  //     this.renderer.setStyle(lineElement, 'width', `${width}px`);
  //     this.renderer.setStyle(lineElement, 'left', `${left}px`);

  //     this.renderer.appendChild(containerElement, lineElement);
  //   }
  // }
  createBackList() {

    console.log(this.listStepItem.length - 1)
    console.log(this.column)
    let count = 0;
    do {
      if (count > 0 && count % (this.column) === 0 && count / this.column > 0) {
        this.blacklistItemLast.push(count - 1)
      }
      count++;
    }
    while (count < this.listStepItem.length)
    console.log(this.blacklistItemLast)
  }

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
  ngAfterViewInit(): void {
    this.getSizeItem()
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
        //check logic call api is here 
        this.checkStatusButton();
      }
    }, 1000);
  }
  checkStatusButton(isPrev = false, selectStep = false) {
    this.prev = this.current !== 0 ? this.current - 1 : 0;
    if (!isPrev) {
      this.listStepItem[this.current].status = true;
      if (this.current === 1) {
        this.listStepItem[this.current - 1].status = true;
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
    for (let i = 0; i <= 20; i++) {
      this.listStepItem.push({
        title: 'step' + i,
        // clickEvent: this.clickEvent1234,
        status: false,
      });
    }
  }

  checkLineAfter(index: number): boolean {
    if (index === this.listStepItem.length - 1) return false;
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
}
