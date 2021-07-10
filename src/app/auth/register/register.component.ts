import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators} from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  user: any= {};
  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  hide: boolean = true;

 //form validation
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.minLength(6),Validators.required]);
  confirmPassword = new FormControl('', [Validators.minLength(6),Validators.required]);

  //register
  loading!: boolean;
  register(user: any)
  {
    this.loading =true;
    this.api.register(this.user.email, this.user.password).subscribe(res=>{
      console.log(res);
      this.loading=false;
      //this.router.navigate(['/login']);
    },error =>{
      this.loading=false;
      alert('Email Sudah terdaftar');
    })
  }
}
