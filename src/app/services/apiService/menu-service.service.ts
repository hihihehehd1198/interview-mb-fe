import { Injectable, inject, signal } from '@angular/core';
import { SampleAPIService } from './sample-api.service';
import { tap } from 'rxjs';


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

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {


  constructor() { }


  private publicAPI = inject(SampleAPIService)

  listMenuData = signal<TreeNode[]>([])


  getDataFromAPI() {
    return this.publicAPI.apiData.pipe(tap(res => {
      if ('menu' in res) {
        this.listMenuData.update(_ => {
          return this.convertToTree(res['menu'] || [])
        })
      }
    }))
  }


  convertToTree(array: any[]): TreeNode[] {
    const map: { [key: string]: TreeNode } = {};

    array.forEach((item) => {
      const { key, title } = item;
      map[key] = { key, title };
    });

    const tree: TreeNode[] = [];

    array.forEach((item) => {
      const { key, parentKey } = item;
      const node = map[key];

      if (parentKey) {
        const parent = map[parentKey];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      } else {
        tree.push(node);
      }
    });
    return tree;
  }
}
