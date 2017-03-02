import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Category } from "../../shared/entity/category";
import { CategoryService } from "../../shared/services/category.service";
import { Product } from "../../shared/entity/product";
import { ProductService } from "../../shared/services/product.service";
import { ErrorDetail } from "../../shared/entity/error-detail";
import { NotificationsService } from "angular2-notifications/components";
import { FormValidationStyles } from "../../shared/form-validation-styles";
import { Router } from "@angular/router";
import { ImageUploadService } from "../../shared/services/image-upload.service";
import { UNSUPPORTED_MEDIA_TYPE} from "http-status-codes";
var HttpStatus = require('http-status-codes');

@Component({
    selector: 'add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    categories: Category[];
    product: Product;
    form: FormGroup;
    formStyles: FormValidationStyles;
    imageForCropper = null;
    showDialog = false;

    private _mainProductURI = '/main/products';
    private imgName: string = null;
    private _filesPropertyName = 'file[]';
    //Validators parameters
    private _digitsPattern = '\\d+';
    private _namePattern = '^[a-zA-Z0-9\u0400-\u04FF]+[ a-zA-Z0-9\u0400-\u04FF,-]*[a-zA-Z0-9\u0400-\u04FF,-]+';
    private _maxPriceInputLength = 5;
    private _maxNameInputLength = 50;

    //Notification titles
    private _createTitle = 'Create';
    private _errorTitle = 'Error';

    //Notification messages
    private _successfulCreationMsg = 'Product has been created successfully';
    private _errorWrongFormatMsg = 'This file format not supported!';
    private _errorProductDuplicateMsg = 'Such product name exists!';
    private _errorWatchLogsMsg = 'Error appeared, watch logs!';
    private _errorNoImage = 'Please put product image!';

    constructor(private categoryService: CategoryService,
                private productService: ProductService,
                private notificationService: NotificationsService,
                private router: Router,
                private imageUpload: ImageUploadService) {

        this.imageUpload.imageName = null;
    }

    ngOnInit() {
        this.imageUpload.imageSrc = this.imageUpload.defaultImageSrc;
        this.buildForm();
        this.categoryService.findAll().subscribe(
            categories => {
                this.categories = categories;
                this.form.get('category').patchValue(categories[0]);
            },
          error => {
            try {
              let errorDetail = <ErrorDetail> error.json();
              if (!errorDetail.detail)
              //noinspection ExceptionCaughtLocallyJS
                throw errorDetail;
              this.notificationService.error(this._errorTitle, errorDetail.detail);
            } catch (err) {
              this.logError(err);
            }
          });
    }


  submit() {
        if (this.imageUpload.imageName) {
            this.productService.save(this.form.value)
                .flatMap((product: Product) => {
                    this.notificationService.success(this._createTitle, this._successfulCreationMsg);
                    let blob = this.imageUpload.dataURItoBlob(this.imageUpload.imageSrc);
                    this.imageUpload.formData = new FormData();
                    this.imageUpload.formData.append(this._filesPropertyName, blob, this.imageUpload.imageFile.name);
                    return this.productService.updateImage(product.id, this.imageUpload.formData);
                })
                .subscribe(
                    () => {
                    },
                  error => {
                    try {
                      let errorDetail = <ErrorDetail> error.json();
                      if (error.status == UNSUPPORTED_MEDIA_TYPE) {
                        this.notificationService.error(this._errorTitle, this._errorWrongFormatMsg);
                      }
                      else {
                        if (errorDetail.code == 1062) {
                          this.notificationService.error(this._errorTitle, this._errorProductDuplicateMsg);
                        }
                        else {
                          if (!errorDetail.detail)
                          //noinspection ExceptionCaughtLocallyJS
                            throw errorDetail;
                          this.notificationService.error(this._errorTitle, errorDetail.detail);
                        }
                      }
                    } catch (err) {
                      this.logError(err);
                    }
                  },
                    () => {
                        this.imageUpload.cleanImageData();
                        this.imageUpload.imageSrc = this.imageUpload.defaultImageSrc;
                        this.form.reset({
                            name: '',
                            price: '',
                            description: '',
                            category: this.categories[0]
                        });
                    }
                );
        }
        else {
            this.notificationService.error(this._errorTitle, this._errorNoImage);
        }
    }


    reset(): void {
        this.router.navigate([this._mainProductURI]);
    }

    setDataForImage(value: string) {
        this.imageUpload.handleImageLoad();
        this.imageUpload.imageSrc = value;
        this.imageUpload.imageName = this.imgName;
    }

    handleInputChange($event) {
        this.imageUpload.fileChangeListener($event).subscribe(
            (img) => {
                this.imageForCropper = img.src;
                this.imgName = img.name;
                this.showDialog = !this.showDialog;
            },
          error => {
            try {
              let errorDetail = <ErrorDetail> error.json();
              if (!errorDetail.detail)
              //noinspection ExceptionCaughtLocallyJS
                throw errorDetail;
              this.notificationService.error(this._errorTitle, errorDetail.detail);
            } catch (err) {
              this.logError(err);
            }
          }
        );

    };

    private buildForm(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required,
                Validators.maxLength(this._maxNameInputLength),
                Validators.pattern(this._namePattern)
            ]),
            price: new FormControl('', [Validators.required,
                Validators.maxLength(this._maxPriceInputLength),
                Validators.pattern(this._digitsPattern)]),
            description: new FormControl(''),
            category: new FormControl('', Validators.required)
        });

        this.formStyles = new FormValidationStyles(this.form);
    }

    private logError(err) {
      console.log(err);
      this.notificationService.error(this._errorTitle, this._errorWatchLogsMsg);
    }
}
