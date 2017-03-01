var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, trigger, style, animate, transition, ViewChild, Type } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ImageUploadService } from "../../shared/services/image-upload.service";
import { NotificationsService } from "angular2-notifications/components";
export var ModalImgCropperComponent = (function (_super) {
    __extends(ModalImgCropperComponent, _super);
    function ModalImgCropperComponent(imageUpload, notificationService) {
        _super.call(this);
        this.imageUpload = imageUpload;
        this.notificationService = notificationService;
        this.closable = true;
        this.visibleChange = new EventEmitter();
        this.setImageForSave = new EventEmitter;
        var screenWidth = window.screen.availWidth;
        this.cropperSettings = new CropperSettings();
        if (screenWidth < 768) {
            this.cropperSettings.canvasWidth = 220;
            this.cropperSettings.canvasHeight = 200;
        }
        else {
            this.cropperSettings.canvasWidth = 500;
            this.cropperSettings.canvasHeight = 300;
        }
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.allowedFilesRegex = /image\/(?:jpeg|png|jpg|apng|svg|bmp)/;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.noFileInput = true;
        this.data = {};
    }
    ModalImgCropperComponent.prototype.animationDone = function (event) {
        var image = new Image();
        image.src = this.cropper_img;
        if (this.cropper_img && this.cropper) {
            this.cropper.setImage(image);
        }
    };
    ModalImgCropperComponent.prototype.setImageData = function () {
        // check image size
        var blob = this.imageUpload.dataURItoBlob(this.data.image);
        if (blob.size > 1024 * 256) {
            this.notificationService.error('Error', 'This image size is too big!');
            this.close();
        }
        else {
            this.setImageForSave.emit(this.data.image);
            var image = new Image();
            image.src = this.data.image;
            this.close();
        }
    };
    ModalImgCropperComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        ViewChild('cropper'), 
        __metadata('design:type', ImageCropperComponent)
    ], ModalImgCropperComponent.prototype, "cropper", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ModalImgCropperComponent.prototype, "closable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ModalImgCropperComponent.prototype, "visible", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], ModalImgCropperComponent.prototype, "visibleChange", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], ModalImgCropperComponent.prototype, "setImageForSave", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ModalImgCropperComponent.prototype, "cropper_img", void 0);
    ModalImgCropperComponent = __decorate([
        Component({
            selector: 'app-modal-img-cropper',
            templateUrl: './modal-img-cropper.component.html',
            styleUrls: ['./modal-img-cropper.component.scss'],
            animations: [
                trigger('dialog', [
                    transition('void => *', [
                        style({ transform: 'scale3d(.3, .3, .3)' }),
                        animate(100)
                    ]),
                    transition('* => void', [
                        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [ImageUploadService, NotificationsService])
    ], ModalImgCropperComponent);
    return ModalImgCropperComponent;
}(Type));
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_coins_vending_frontend/src/src/app/shared/modal-img-cropper/modal-img-cropper.component.js.map