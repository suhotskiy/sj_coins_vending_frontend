import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Category} from "../../shared/entity/category";
import {CategoryService} from "../../shared/services/category.service";
import {NotificationsService} from "angular2-notifications/components";
import {ErrorDetail} from "../../shared/entity/error-detail";
import { FormValidationStyles } from "../../shared/form-validation-styles";

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private categoryService: CategoryService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*[a-zA-Z]+$')
      ])
    });

    this.formStyles = new FormValidationStyles(this.form);
  }

  submit() {
    let category = new Category(this.form.get('name').value);
    console.log(this.form.get('name').value);
    this.categoryService.save(category)
      .subscribe(category => {
          this.notificationService.success('Create', 'Category was created successfully');
          this.form.reset({
            name: ''
          });
        },
        error => {
          var errorDetail: ErrorDetail = JSON.parse(error._body);
          if (errorDetail.code == 1062) {
            this.notificationService.error('Error', 'Such category name exists!');
          }
          else {
            this.notificationService.error('Error', errorDetail.detail);
          }
        });
  }
}
