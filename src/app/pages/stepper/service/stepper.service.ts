import { Injectable, OnInit } from '@angular/core';
import { from, tap } from 'rxjs';

export enum StepEventType {
  UNDEFINED = "undefined",
  FUNCTION = "function"
}
export interface StepItem {
  title: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() {

  }

  clearStepper() {
    this.listStepItem = [];
    this.current = 0;
    this.prev = 0;
    this.blacklistItemLast = []
    this.lineWidth = 'unset';
  }

  listStepItem: StepItem[] = [];
  current: number = 0;
  prev: number = 0;
  blacklistItemLast: number[] = []
  lineWidth: string = 'unset';




  prevStep() {
    if (this.current > 0) {
      this.current = this.current - 1;

      this.checkStatusButton(true);
    }
  }
  nextStep() {

    // from([true]).pipe(tap(res => {
    if (this.current < this.listStepItem.length) {
      this.current = this.current + 1;
      //check logic call api is here 
      this.checkStatusButton();
    }
    // })).subscribe()

  }
  checkStatusButton(isPrev = false, selectStep = false) {
    this.prev = this.current !== 0 ? this.current - 1 : 0;
    if (!isPrev) {
      this.listStepItem[this.current - 1].status = true;
      if (this.current === 1) {
        this.listStepItem[this.current - 1].status = true;
      }
      // }
    }

  }

  gotoStep(index: number) {
    // console.log(this.prev, this.current, index);
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
    for (let i = 0; i <= 10; i++) {
      this.listStepItem.push({
        title: 'step' + i,
        status: false,
      });
    }
  }


}
