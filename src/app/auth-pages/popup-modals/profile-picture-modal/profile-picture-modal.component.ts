import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/ApiService';

@Component({
  selector: 'app-profile-picture-modal',
  templateUrl: './profile-picture-modal.component.html',
  styleUrls: ['./profile-picture-modal.component.scss']
})
export class ProfilePictureModalComponent implements OnInit, OnDestroy {
  imageList = [];
  imageSubscription: Subscription;
  errorMessages = {
    INVALID_FILE_TYPE: "Non-supported image type uploaded",
    MAXIMUM_SIZE: "You can only upload image of file size less than 2MB",
    DIMENSIONS: "The image should be 400 x 400 pixels at least",
  };
  validation = {
    type: false,
    size: false,
    dimensions: false,
  }

  @ViewChild('fileInput') input;

  constructor(
    private apiService: ApiService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.imageSubscription = this.apiService.getCuratedProfilePictures().subscribe((result: any) => {
      this.imageList = [...result];
    });
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

  onUploadButtonClick() {
    this.input.nativeElement.click();
  }

  onFileChanged(event) {
    const files = event.target.files;
    this.resetValidation();

    if (files[0]) {
      const file = files[0];
      if (!this.validFileType(file)) {
        this.toastr.error(this.errorMessages.INVALID_FILE_TYPE);
      } else {
        this.validation.type = true;
      }

      if (!this.validFileSize(file.size)) {
        this.toastr.error(this.errorMessages.MAXIMUM_SIZE);
      } else {
        this.validation.size = true;
      }

      const reader = new FileReader(), self = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        const image: any = new Image();
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          const height = this.height;
          const width = this.width;
          if (height < 400 || width < 400) {
            self.toastr.error(self.errorMessages.DIMENSIONS);
            self.validation.dimensions = false;
            self.triggerEnable();
            return false;
          }
          self.validation.dimensions = true;
          self.triggerEnable();
          return true;
        };

      }

      this.triggerEnable();
    }
  }

  private validFileType(file: File): boolean {
    return [
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/tiff",
    ].includes(file.type);
  }

  private validFileSize(size: number): boolean {
    return size <= (1024 * 1024 * 2);
  }

  private resetValidation() {
    this.validation.dimensions = false;
    this.validation.size = false;
    this.validation.type = false;
  }

  private triggerEnable() {
    const { type, size, dimensions } = this.validation;

    return type && size && dimensions;
  }

}
