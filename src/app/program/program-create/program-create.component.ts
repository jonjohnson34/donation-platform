import { Component, OnInit } from '@angular/core';
import { FormGroup,
  FormControl,
  Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-program-create',
  templateUrl: './program-create.component.html',
  styleUrls: ['./program-create.component.css']
})
export class ProgramCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private location: Location,
    private program: ProgramService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      programName     : new FormControl(null, { validators: [Validators.required] }),
      programDesc     : new FormControl(null, { validators: [Validators.required] }),
      amountRequested : new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSaveProgram(){
    if (!this.form.valid){
      return;
    } else {
      this.program.createProgram(this.form.value.programName, this.form.value.programDesc, this.form.value.amountRequested);
    }
  }

  cancel(){
    alert('this cancels');
  }

}
