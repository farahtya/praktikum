import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  fileName = '';

  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

selectedFile:any;
onFileChange(event:any):void {
  if(event.target.files.length > 0) {
      this.selectedFile=event.target.files[0];
      if(this.selectedFile.type != 'image/png') alert('File harus PNG');
      console.log(this.selectedFile);
  }
  }

loadingUpload!: boolean;
 uploadFile() {
   let input = new FormData();
   input.append('file', this.selectedFile);
   this.loadingUpload = true;
   this.api.upload(input).subscribe(data=>{
     this.updateProduct(data);
     console.log(data);
   },error=>{
       this.loadingUpload = false;
       alert('Gagal mengunggah file');
   });
 }


updateProduct(data: any)
 {
   if(data.status == true)
   {
     /*lakukan update data produk disini
      this.api.put('/bookswithauth',this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loadingUpload=false;
        alert('File berhasil diunggah');
         },erorr=>{
        */
        this.loadingUpload=false;
        alert('File berhasil diunggah');
   }else{
     alert(data.massage);
   }
 }

}
