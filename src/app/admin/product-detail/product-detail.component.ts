import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService
  ) { }

  ngOnInit(): void {
  }

  loading!: boolean
  saveData()
  {
    this.loading=true
    if(this.data.id == undefined)
    {
      this.api.post('/bookswithauth',this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
      },erorr=>{
        this.loading=false;
        alert('Tidak dapat menyimpan data, Coba Lagi');
      });
    }else{
      this.api.put('/bookswithauth///'+ this.data.id, this.data).subscribe(result=>{
        this.dialogRef.close(result);
        this.loading=false;
      },erorr=>{
        this.loading=false;
        alert('Tidak dapat memperbaharui data, Coba Lagi');
      })
  }}
}
