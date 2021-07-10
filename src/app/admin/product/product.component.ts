import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books: any=[];
  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) {

  }

  ngOnInit(): void {
    this.title="Product";
    this.book={
      title:'Belajar Angular4+ untuk Pemula',
      author:'Farid Suryanto',
      publisher: 'Sunhouse Digital',
      year: '2020',
      isbn: '88123123112',
      price: '75000'
    };
    this.getBooks();
  }

  loading!: boolean;
  getBooks()
  {
    this.loading = true;
    this.api.get('bookswithauth').subscribe(result => {
      this.books=result;
      this.loading=false;
    }, err => {
      this.loading=false;
      alert('Ada masalah saat pengambilan data. Coba lagi!');
    })
  }

  /*
  {
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Tidak dapat mengambil data, Coba Lagi');
    })
  }*/


    productDetail(data: any, idx: number)
  {
    let dialog = this.dialog.open(ProductDetailComponent, {
      width: '400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.books.push(res);
        //jika tidak maka perbarui data
        else this.books[idx]=data;
      }
    })
  }

  loadingDelete: any={};
  deleteProduct(book: any, idx: any)
  {
    var conf = confirm('Delete item?');
    if(conf)
    {
      this.loadingDelete[idx]=true;
      this.api.delete('/bookswithauth///' + this.books[idx].id).subscribe(result=>{
      this.books.splice(idx,1);
      this.loadingDelete[idx]=false;
    },error=>{
      alert('Tidak dapat menghapus data, coba lagi');
      this.loadingDelete[idx]=false;
    });
    }
  }

  upload(data: any)
  {
  let dialog=this.dialog.open(FileUploaderComponent, {
  height: '300px',
  width: '400px',
  data:data
  });
  dialog.afterClosed().subscribe(res=>{
  return;
  })
}
  download(data: any)
  {
    FileSaver.saveAs('http://api.sunhouse.co.id/bookstore/' + data.url);
  }

}

