import {BrowserModule} from "@angular/platform-browser";
import {
  ErrorHandler,
  NgModule
} from "@angular/core";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MdCardModule} from "@angular/material";
import {MainInfoComponent} from "./main-info/main-info.component";
import {TopNavComponent} from "./shared/top-nav/top-nav.component";
import {SideBarComponent} from "./shared/side-bar/side-bar.component";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {
  AddProductComponent,
  ProductItemComponent,
  ProductsComponent
} from "./products/";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {
  AddMachineComponent,
  FillMachineComponent,
  MachineItemComponent,
  MachinesComponent
} from "./machines/";
import {
  AddCategoryComponent,
  CategoriesComponent
} from "./categories/";
import {MachineService} from "./shared/services/machine.service";
import {DashboardService} from "./shared/services/dashboard.service";
import {CategoryService} from "./shared/services/category.service";
import {TokenService} from "./shared/services/token.service";
import {AccountService} from "./shared/services/account.service";
import {HttpService} from "./shared/services/http.service";
import {UsersComponent} from "./users/users.component";
import {MachineSizePipe} from "./machines/machine-item/machine-size.pipe";
import {ProductService} from "./shared/services/product.service";
import {SimpleNotificationsModule} from "angular2-notifications";
import {LdapUsersService} from "./shared/services/ldap.users.service";
import {AdminUsersService} from "./shared/services/admin.users.service";
import {EditProductComponent} from "./products/edit-product/edit-product.component";
import {ImageUploadService} from "./shared/services/image-upload.service";
import {PurchasesComponent} from "./purchases/purchases.component";
import {PurchaseService} from "./shared/services/purchase.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalImgCropperComponent} from "./shared/image-loader/modal-img-cropper/modal-img-cropper.component";
import {ImageCropperModule} from "ng2-img-cropper";
import {CoinManagementComponent} from "./coin-management/coin-management.component";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {CoinService} from "./shared/services/coin.service";
import {EditMachineComponent} from "./machines/edit-machine/edit-machine.component";
import {GlobalErrorHandler} from "./shared/global-error-handler";
import {NotificationsManager} from "./shared/notifications.manager";
import {UploadItemComponent} from "./shared/image-loader/upload-item/upload-item.component";
import {ImageLoaderComponent} from "./shared/image-loader/image-loader.component";
import {ProductFormComponent} from "./products/product-form/product-form.component";
import {DatePipe} from "./shared/pipes/date.pipe";
import {TransactionsComponent} from "./transactions/transactions.component";
import {TransactionService} from "./shared/services/transaction.service";
import {UpperFirstSymbolPipe} from "./shared/pipes/upper-first-symbol.pipe";
import {TransactionFilterItemComponent} from "./transactions/transaction-filter-item/transaction-filter-item.component";
import {RlTagInputModule} from "angular2-tag-input";
import {TransactionComponent} from "./transactions/transaction/transaction.component";
import {Md2Module} from "md2";
import {DropdownCascadeComponent} from "./transactions/dropdown-cascade/dropdown-cascade.component";
import {CascadeItemsComponent} from "./transactions/dropdown-cascade/cascade-items/cascade-items.component";
import {PointSeparatorPipe} from "./shared/pipes/point-separator.pipe";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MachineRowDirective} from "./shared/directives/machine-row.directive";
import {MachineCellDirective} from "./shared/directives/machine-cell.directive";
import {NutritionFactsFormComponent} from "./products/product-form/nutrition-facts-form/nutrition-facts-form.component";
import {DynamicFormComponent} from "./shared/dynamic-form/dynamic-form.component";
import {DynamicFormQuestionComponent} from "./shared/dynamic-form/dynamic-form-question/dynamic-form-question.component";
import {AppRoutingModule} from "./app-routing.module";
import {LoginModule} from "./login/login.module";
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import * as highcharts from "highcharts";
import * as drilldown from "highcharts/modules/drilldown";
import { LoadHistoryComponent } from './machines/load-history/load-history.component';

export function highchartsFactory() {
  const hc = highcharts;
  const dd = drilldown;
  dd(hc);

  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    MainInfoComponent,
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
    UsersComponent,
    AddCategoryComponent,
    MachineSizePipe,
    EditProductComponent,
    PurchasesComponent,
    ModalImgCropperComponent,
    CoinManagementComponent,
    EditMachineComponent,
    UploadItemComponent,
    ImageLoaderComponent,
    ProductFormComponent,
    DatePipe,
    TransactionsComponent,
    UpperFirstSymbolPipe,
    TransactionFilterItemComponent,
    TransactionComponent,
    DropdownCascadeComponent,
    CascadeItemsComponent,
    PointSeparatorPipe,
    NutritionFactsFormComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    MachineRowDirective,
    MachineCellDirective,
    LoadHistoryComponent
  ],
  entryComponents: [UploadItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MdCardModule,
    HttpModule,
    Ng2BootstrapModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    RlTagInputModule,
    Md2Module.forRoot(),
    ImageCropperModule,
    ChartModule,
    ImageCropperModule,
    LoginModule
  ],
  providers: [
    TokenService,
    HttpService,
    AccountService,
    MachineService,
    DashboardService,
    CategoryService,
    ProductService,
    LdapUsersService,
    AdminUsersService,
    ImageUploadService,
    PurchaseService,
    CoinService,
    NotificationsManager,
    TransactionService,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
