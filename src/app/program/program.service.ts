import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + '/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createProgram( programName, programDesc, amountRequested ) {

    const programData = {
        programName: programName,
        programDesc: programDesc,
        amountRequested: amountRequested
    };

    console.log(programData);
  }
  
 /* getPrograms(){};
  
  getProgram(){};
  
  updateProgram(){};
  
  removeProgram(){};
*/



}
