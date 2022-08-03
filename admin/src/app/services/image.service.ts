import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  public satanizer(url: Blob){
    return this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(url));
  }
}
