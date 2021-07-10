import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDesign } from '../material-design/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './images/images.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      //pengaturan router untuk halaman product
      {
        path:'product',
        component:ProductComponent
      },
      {
        path:'',
        redirectTo:'/admin/dashboard',
        pathMatch:'full'
      }
    ]
  },

]


@NgModule({
  declarations: [AdminComponent, DashboardComponent, ProductComponent, ImageUploaderComponent, GalleryComponent, ProductDetailComponent, FileUploaderComponent],
  entryComponents:[
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    ImageCropperModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
