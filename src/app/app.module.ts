import { FormPipe } from 'src/app/pipes/form.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
// import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { RouterModule } from '@angular/router';
import { NzTreeModule, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzTreeView, NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { DemoNgZorroAntdModule } from './antd.module';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzFormModule } from 'ng-zorro-antd/form';


registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,//akjsgdhhjagd,
    
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, HttpClientJsonpModule, ReactiveFormsModule,
    DemoNgZorroAntdModule, AppRoutingModule, IconsProviderModule, NzLayoutModule, NzMenuModule],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }]
})
export class AppModule { }
