import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes =[
    {path: '', redirectTo: 'main-page', pathMatch: 'full'},
    {path: 'main-page', component: MainPageComponent},
    {path: 'product-page/:nameCategory/:id', component: ProductPageComponent},
    {path: 'cart', component: CartComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}