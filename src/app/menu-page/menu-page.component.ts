import { AfterViewInit, ChangeDetectorRef, Component, ChangeDetectionStrategy, inject, Input, ViewChild, signal, OnDestroy, } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { MenuServiceService } from '../services/apiService/menu-service.service';

export interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
}
export interface treeNodeList {
  key: string,
  title: string,
  parentKey: string
}


@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MenuPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  private cdf = inject(ChangeDetectorRef)
  menuService = inject(MenuServiceService)
  getMenuSubscription = new Subscription()

  ngAfterViewInit(): void {
    // this.nodes = this.menuService.convertToTree()

    this.getMenuSubscription = this.menuService.getDataFromAPI().pipe(tap(_ => {
    })).subscribe()
  }

  ngOnDestroy(): void {
    this.getMenuSubscription.unsubscribe()
  }

}
