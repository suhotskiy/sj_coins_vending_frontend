import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { CategoryService } from "../shared/services/category.service";
import { Category } from "../shared/entity/category";
import { NotificationsService } from "angular2-notifications";
import { ErrorDetail } from "../shared/entity/error-detail";
import { AddMenu } from "../shared/entity/add-menu";
import { Overlay } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";

@Component({
  selector: 'categories-list',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[];
  public addMenu: AddMenu = new AddMenu();

  constructor(private categoryService: CategoryService,
              private notificationService: NotificationsService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.updateCategories();
  }

  public updateCategories() {
    this.categoryService.findAll().subscribe(
      categories => this.categories = categories,
      error => {
        try {
          let errorDetail = <ErrorDetail> error.json();
          if (!errorDetail.detail)
          //noinspection ExceptionCaughtLocallyJS
            throw errorDetail;
          this.notificationService.error('Error', errorDetail.detail);
        } catch (err) {
          console.log(err);
          this.notificationService.error('Error', 'Error appeared, watch logs!');
        }
      }
    );
  }

  private deleteCategory(id: number) {
    this.modal.confirm()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Delete category')
      .body('Do you really want to delete this category?')
      .okBtn('Yes')
      .okBtnClass('btn btn-success modal-footer-confirm-btn')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-secondary modal-footer-confirm-btn')
      .open()
      .then(
        (response) => {
          response.result.then(
            () => {
              this.categoryService.delete(id).subscribe(
                next => {
                },
                error => {
                  try {
                    let errorDetail = <ErrorDetail> error.json();
                    if (errorDetail.code == 1451) {
                      this.notificationService.error('Error', 'Can not delete, this category is being used!');
                    }
                    else {
                      if (!errorDetail.detail)
                      //noinspection ExceptionCaughtLocallyJS
                        throw errorDetail;
                      this.notificationService.error('Error', errorDetail.detail);
                    }
                  } catch (err) {
                    console.log(err);
                    this.notificationService.error('Error', 'Error appeared, watch logs!');
                  }
                },
                () => {
                  this.categoryService.findAll().subscribe(
                    categories => {
                      this.categories = categories;
                      this.notificationService.success('Delete', 'Category has been deleted successfully.');
                    }
                  );
                });
            },
            () => {
            }
          );
        });
  }
}


