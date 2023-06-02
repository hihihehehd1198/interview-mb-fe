import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SampleAPIService } from './services/apiService/sample-api.service';
import { Subscription, tap } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;

  publicApi = inject(SampleAPIService)
  callApiStreram = new Subscription()
  //call once api
  ngOnInit(): void {
    this.callApiStreram = this.publicApi.getAllData().pipe().subscribe()
  }
  ngOnDestroy(): void {
    this.callApiStreram.unsubscribe()
  }
}
