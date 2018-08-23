import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VideoApiService } from './shared/services/video-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressFormComponent } from './shared/components/address-form/address-form.component';
import { AddressDisplayComponent } from './shared/components/address-display/address-display.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    ProductPageComponent,
    CartComponent,
    CategoryPageComponent,
    FilterComponent,
    SearchComponent,
    ProfileComponent,
    AddressComponent,
    OrdersComponent,
    DropdownDirective,
    CheckoutComponent,
    AddressFormComponent,
    AddressDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [VideoApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
