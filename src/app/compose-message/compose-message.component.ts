import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {

  private messagefg: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.messagefg = this.formBuilder.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  sendMessage() {
    console.log(`Subject : ${(this.messagefg.get('subject') as FormControl).value}`);
    console.log(`Message : ${(this.messagefg.get('body') as FormControl).value}`);
    setTimeout(() => {
      this.closeMessage();
    }, 1000);
  }

  cancelMessage() {
    this.messagefg.patchValue({
      subject: '',
      body: ''
    });
    this.closeMessage();
  }

  closeMessage() {
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
