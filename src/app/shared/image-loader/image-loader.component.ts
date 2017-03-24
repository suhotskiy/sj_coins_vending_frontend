import {Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef} from "@angular/core";
import {UploadItemComponent} from "./upload-item/upload-item.component";
import {ModalImgCropperComponent} from "./modal-img-cropper/modal-img-cropper.component";

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {


  @ViewChild('imgList', {read: ViewContainerRef}) imgList;
  @ViewChild('modalImageCropper') cropper: ModalImgCropperComponent;

  height: number;
  width: number;

  private _defaultSource = "/assets/images/default-product-350x350.jpg";
  //TODO use @ViewChildren. Make research
  private _imageComponents: UploadItemComponent[];
  private _coverImage: HTMLImageElement;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.height = 205;
    this.width = 205;
  }

  get coverImage(): HTMLImageElement {
    return this._coverImage;
  }

  set coverImage(value: HTMLImageElement) {
    this._coverImage = value;
  }

  ngOnInit() {
    this._imageComponents = [];
    this.setDefaultImage();
    this.cropper.visible = false;
    this.cropper.onCrop.subscribe((image) => this.addImage(image))
  }

  addImage(image: HTMLImageElement) {
    this._coverImage = image;
    const factory = this.componentFactoryResolver.resolveComponentFactory(UploadItemComponent);
    const ref = this.imgList.createComponent(factory);
    this._imageComponents.push(ref.instance);
    ref.instance.image = image;
    ref.instance.onDelete.subscribe((next) => this.findAndDestroy(ref));
    ref.instance.onClick.subscribe((next) => this._coverImage = ref.instance.image);
    ref.changeDetectorRef.detectChanges();
  }

  onFileLoad(event) {
    let imageFile = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    let reader: FileReader = new FileReader();
    let image = new Image();
    let self = this;
    image.name = imageFile.name;
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
      image.src = reader.result;
      self.setUpCropper(image);
    };
    // Without this line event would not fire for the same file
    event.target.value = null;
  }

  isEmpty(): boolean {
    return this._imageComponents.length <= 0;
  }

  /**
   * Form with cover file that was uploaded view model cropper
   * @param propertyName
   * @returns {FormData}
   */
  getImageFormData(propertyName: string): FormData {
    let formData = new FormData();
    let appended = ImageLoaderComponent.appendImageToFormData(formData, propertyName, this._coverImage);
    if (!appended)
      return null;
    return formData;
  }

  /**
   * Create array of files that will be send to the server
   * @param propName
   * @returns {FormData} null in case if component is empty or all stored images loaded from server
   */
  getDescriptionImagesFormData(propName: string): FormData {
    let formData = new FormData();
    let isEmpty = true;
    for (let component of this._imageComponents) {
      if (component.image == this._coverImage)
        continue;
      let appended = ImageLoaderComponent.appendImageToFormData(formData, propName, component.image);
      isEmpty = isEmpty && !appended;
    }
    if (isEmpty)
      return null;
    return formData;
  }

  /**
   * Find matches between stored urls in component and original
   * Stored urls is array that contains images with URL address SRC (component can have blob images they are not mentioned)
   *
   * @param originUrls
   * @returns {any} missed urls that exists in origin and deleted in component storage
   * ALSO !!!
   * Return COVER image url due to it is another call TEMPORARY SOLUTION
   */
  getDeletedUrls(originUrls: Array<string>): Array<string> {
    let storedArray = this.getStoredUrlsWithExternalSource();
    if (storedArray && originUrls)
      return originUrls
        .filter(url => storedArray
          .every(stored => stored.localeCompare(url) != 0 || this._coverImage.src.localeCompare(url) == 0));
    else
      return [];
  }

  private getStoredUrlsWithExternalSource(): Array<string> {
    return this._imageComponents
      .map(component => component.image.src)
      .filter(src => ImageLoaderComponent.isUrl(src))
  }

  private static isUrl(text: string): boolean {
    let externalUrlRegex = /https*:/i;
    return !!text.match(externalUrlRegex);
  }

  //TODO delete image item components
  reset() {

  }

  //TODO analyze if need to move this logic to parent component
  // + used only for edit and create. Less same code

  /**
   * @param formData
   * @param propName
   * @param image
   * @returns {boolean} Returns true if successfully created blob and append it to formData
   */
  private static appendImageToFormData(formData: FormData, propName: string, image: HTMLImageElement): boolean {
    try {
      let blob = ModalImgCropperComponent.dataURItoBlob(image.src);
      formData.append(propName, blob, image.name);
      return true;
    } catch (error) {
      return false;
    }
  }

  private setUpCropper(image: HTMLImageElement) {
    this.cropper.cropImage = image;
    this.cropper.visible = true;
  }

  private setDefaultImage(): HTMLImageElement {
    this._coverImage = new Image(this.width, this.height);
    this._coverImage.src = this._defaultSource;
    return this._coverImage;
  }

  private findAndDestroy(ref: ComponentRef<UploadItemComponent>) {
    this._imageComponents = this._imageComponents.filter((component) => component !== ref.instance);
    if (this._coverImage == ref.instance.image) {
      if (this._imageComponents.length == 0)
        this.setDefaultImage();
      else
        this._coverImage = this._imageComponents[0].image;
    }
    ref.destroy();
  }

}
