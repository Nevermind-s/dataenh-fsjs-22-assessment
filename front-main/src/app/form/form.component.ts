import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MailsService } from '../mails.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
mail = this.fb.group( {
  address: ['', Validators.compose([Validators.required, Validators.email])],
  name : ['', Validators.required],
  subject : ['', Validators.required],
  template: ['', Validators.required],
  message: ['', Validators.required]
});
templates:any =  this.mails.getTemplates();
progress = false;
envoyerForm(){
 
  if(this.mail.valid){
    this.progress = true
    //console.log(this.mail.value);
    this.mails.sendMail(this.mail.value).subscribe((res) => {
      alert(res.message);
      this.progress = false;
    });

  }
}
  constructor(private fb: FormBuilder, private mails: MailsService) { }

  ngOnInit(): void {
  }

}
