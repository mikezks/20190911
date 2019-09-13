import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.css']
})
export class TabbedPaneComponent implements OnInit, AfterContentInit {
  @Input() activeId: number;
  @Output() activeIdChange = new EventEmitter<number>();

  @ContentChildren(TabComponent)
  tabList: QueryList<TabComponent>;

  currentTab: TabComponent;

  get tabs() {
    if (!this.tabList) {
      return [];
    }

    return this.tabList.toArray();
  }

  constructor() { }

  ngOnInit() {
  }

  activate(): void {
    this.tabs.forEach(tab => {
      tab.active = tab.id === this.activeId;
    });
  }

  jump(id: number): void {
    this.activeId = id;
    this.activate();
    this.activeIdChange.emit(id);
  }

  ngAfterContentInit(): void {
    this.activate();
  }
}
