import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { Product } from "../entity/product";
import { AppProperties } from "../app.properties";
import { CrudService } from "./crud.service";
import { Http, ResponseContentType, RequestOptions, Headers, Response } from "@angular/http";

@Injectable()
export class ProductService extends CrudService<Product> {

  constructor(public http: Http, protected httpService: HttpService) {
    super(httpService);
  }

  protected getUrl(): string {
    return `${AppProperties.API_VENDING_ENDPOINT}/products`;
  }

  public findAllThatContainByName(name: string): Observable<Product[]> {
    return this.httpService.get(this.getUrl() + '/search?name=' + name).map(response => {
      return response.json();
    });
  }

  public updateImage(id: number, file: any): Observable<{}> {
    let url = `${this.getUrl()}/${id}/image`;

    return this.httpService.post(url, file)
      .flatMap(response => Observable.empty())
  }

  public updateImages(id: number, file: any): Observable<{}> {
    let url = `${this.getUrl()}/${id}/images`;

    return this.httpService.post(url, file)
      .flatMap(response => Observable.empty())
  }

  public deleteImage(url: string): Observable<{}> {
    return this.httpService.delete(url)
      .flatMap(response => Observable.empty());
  }

  public loadImage(productId, blob: Blob, fileName?: string): Observable<Response> {
    let url = `${this.getUrl()}/${productId}/images`;
    let parameter = "files";

    let formData = new FormData();
    if (fileName) {
      formData.append(parameter, blob, fileName);
    } else {
      formData.append(parameter, blob);
    }
    return this.httpService.post(url, formData);
  }

  //TODO Remove this method and related. This is temporary solution
  public getImageBlob(url: string): Observable<Blob> {
    let header = new Headers();
    header.append('Content-Type', 'image/jpg');
    return this.http.get(url, {
      headers: header, responseType: ResponseContentType.Blob
    }).map(
      response => response.blob()
    );
  }
}
