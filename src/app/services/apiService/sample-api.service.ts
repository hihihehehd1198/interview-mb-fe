import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleAPIService {

  private httpClient = inject(HttpClient)
  apiData = new BehaviorSubject<any>({})
  getAllData(): Observable<any> {
    return this.httpClient.get('http://localhost:4333/queryAll').pipe(tap((data) => {
      this.apiData.next(data)
    }))
  }



}
