import { Injectable, Signal, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SampleAPIService } from './sample-api.service';
import { Observable, catchError, of, tap } from 'rxjs';

export interface FormTypes {
  controlName: string,
  validators?: ValidatorFn[]
}
export type translateFormType = {
  [lang: string]: {
    titleForm: string,
    titleFormControl: string[],
    buttonText: string
  }
}
export type formMessage = {
  formControlsName: string[],
  i18n: translateFormType
}
@Injectable({
  providedIn: 'root'
})
export class FormService {


  private fb = inject(UntypedFormBuilder)
  listControlName: string[] = []
  private publicApiInstance = inject(SampleAPIService)

  formInstance = signal<FormGroup>(this.fb.group({

  }))
  listLanguageOption: string[] = []
  dataLanguage: translateFormType = {}
  titleForm: string = ''
  buttonText: string = ''
  listLabelInput: string[] = []

  submitForm() {
    throw new Error('Method not implemented.');
  }

  getFormFromApi(): Observable<any> {
    return this.publicApiInstance.apiData.pipe(tap(res => {
      if ('form' in res) {
        const response: formMessage = res['form']
        this.dataLanguage = response.i18n
        this.listControlName = response.formControlsName
        this.listLanguageOption = Object.keys(res['form']['i18n'])
        this.initForm(this.listControlName)
        this.switchLanguageForm()
      }
    }), catchError(((err: Error) => {
      return of(err.message)
    })))
  }

  initForm(listControl: string[]) {
    const newFormGroupinstance = this.fb.group({})
    try {
      if (listControl.length) {
        listControl.forEach((controlName) => {
          newFormGroupinstance.addControl(controlName,
            new FormControl('', Validators.required))
        })
      }
      this.formInstance.update(() => newFormGroupinstance)
    } catch (error) {
      this.clearALLcontrol()
      throw new Error('khong tao duoc form')
    }
  }

  clearALLcontrol() {
    //get list controlName 
    try {
      const listControlName = Object.keys(this.formInstance().controls)
      listControlName.forEach((control) => {
        this.formInstance().removeControl(control)
      })
    } catch (error) {

    }
  }
  switchLanguageForm(option: string = 'en') {
    this.titleForm = this.dataLanguage[option].titleForm
    this.listLabelInput = this.dataLanguage[option].titleFormControl
    this.buttonText = this.dataLanguage[option].buttonText
  }
}
