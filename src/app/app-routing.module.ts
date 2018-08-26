import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { SearchComponent } from "./search/search.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddressComponent } from "./address/address.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { CallbackComponent } from "./callback/callback.component";

const routes: Routes =[
    {path: '', redirectTo: 'main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainPageComponent},
    {path: 'product-page/:nameCategory/:id', component: ProductPageComponent},
    {path: 'cart', component: CartComponent},
    {path: 'category/:nameCategory', component: CategoryPageComponent},
    {path: 'search', component: SearchComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'address', component: AddressComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'confirmation', component: ConfirmationComponent},
    {path: 'callback', component: CallbackComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}