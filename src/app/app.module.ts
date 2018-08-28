import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatProgressSpinnerModule} from '@angular/material';


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
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressFormComponent } from './shared/components/address-form/address-form.component';
import { AddressDisplayComponent } from './shared/components/address-display/address-display.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConverterPipe } from './shared/pipes/converter.pipe';
import { CallbackComponent } from './callback/callback.component';


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
    CheckoutComponent,
    AddressFormComponent,
    AddressDisplayComponent,
    ConfirmationComponent,
    ConverterPipe,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        closeButton: true
      }
    ),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    VideoApiService, 
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
