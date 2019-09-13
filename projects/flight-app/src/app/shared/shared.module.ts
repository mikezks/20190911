import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {CityPipe} from './pipes/city.pipe';
import { TabComponent } from './controls/tab/tab/tab.component';
import { TabbedPaneComponent } from './controls/tab/tabbed-pane/tabbed-pane.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent,
  ],
  exports: [
    CityPipe,
    TabComponent,
    TabbedPaneComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
