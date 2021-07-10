import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  user: any= {};
  constructor() { }

  ngOnInit(): void {
  }

  email = new FormControl('', [Validators.required]);

}
