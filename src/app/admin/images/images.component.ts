import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  images:any=[];

  openUploader(): void {
    const dialogRef = this.dialog.open(ImageUploaderComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
     //close dialog callback
     if (result!=false)
      this.images.push(result);
    });
  }

}
