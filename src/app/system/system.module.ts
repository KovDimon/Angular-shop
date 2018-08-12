
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    SystemComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule
  ],
  providers: [],
})
export class SystemModule { }
