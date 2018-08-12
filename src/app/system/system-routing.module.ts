import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SystemComponent } from "./system.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ProductPageComponent } from "./product-page/product-page.component";

const routes: Routes =[
    {path: '', component: SystemComponent, children: [
        {path: 'main-page', component: MainPageComponent},
        {path: 'product-page/:nameCategory/:id', component: ProductPageComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SystemRoutingModule{}