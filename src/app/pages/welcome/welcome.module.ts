import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { SampleFormComponent } from '../sample-form/sample-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormPipe } from 'src/app/pipes/form.pipe';
// import { FormPipe } from 'src/app/pipes/form.pipe';


@NgModule({
  imports: [WelcomeRoutingModule, NzFormModule, ReactiveFormsModule, CommonModule,
  ],
  declarations: [WelcomeComponent, SampleFormComponent, FormPipe],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
