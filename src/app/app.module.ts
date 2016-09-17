import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from "./app.routing";
import { MdInputModule } from "@angular2-material/input";
import { MdButtonModule } from "@angular2-material/button";
import { MdIconModule } from "@angular2-material/icon";
import { OverlayModule } from "@angular2-material/core";
import { MainInfoComponent } from "./main-info/main-info.component";
import { LoginComponent } from "./login/login.component";
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { Ng2BootstrapModule, ButtonsModule } from "ng2-bootstrap/ng2-bootstrap";
import { ProductsComponent, ProductItemComponent, AddProductComponent } from './products/';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MachinesComponent, MachineItemComponent, AddMachineComponent, FillMachineComponent } from './machines/';
import { CategoriesComponent, AddCategoryComponent } from './categories/';
import { MachineService } from "./shared/services/machine.service";
import { DashboardService } from "./shared/services/dashboard.service";
import { CategoryService } from "./shared/services/category.service";
import { TokenService } from "./shared/services/token.service";
import { AccountService } from "./shared/services/account.service";
import { HttpService } from "./shared/services/http.service";
import { MdCardModule } from "@angular2-material/card";
import { MachineSizePipe } from './machines/machine-item/machine-size.pipe';
import { ProductService } from "./shared/services/product.service";


@NgModule({
  declarations: [
    AppComponent,
    MainInfoComponent,
    LoginComponent,
    TopNavComponent,
    SideBarComponent,
    ProductsComponent,
    ProductItemComponent,
    AddProductComponent,
    DashboardComponent,
    MachinesComponent,
    MachineItemComponent,
    AddMachineComponent,
    FillMachineComponent,
    CategoriesComponent,
    AddCategoryComponent,
    MachineSizePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    routing,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    OverlayModule,
    HttpModule,
    Ng2BootstrapModule,
    ButtonsModule
  ],
  providers: [
    TokenService,
    HttpService,
    AccountService,
    appRoutingProviders,
    MachineService,
    DashboardService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
