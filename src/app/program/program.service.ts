import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Program } from '../program/program.model';

const BACKEND_URL = environment.apiURL + '/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private programsMultiPurpose: any = [];
  private programsUpdated = new Subject<Program[]>();

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  createProgram(programName, programDesc, amountRequested) {

    const programData = {
      program_name: programName,
      program_desc: programDesc,
      amount_requested: amountRequested
    };

    this.http.post<{ message: string, data: any }>(BACKEND_URL + '/create', programData)
      .subscribe(response => {
        const program = {
          programName: response.data.progam_name,
          programDesc: response.data.program_desc,
          amountRequested: response.data.amount_requested,
          amountFunded: response.data.amount_donated
        };
        this.router.navigate(['/program']);
      });
  }

  getPrograms() {
    this.http.get<{ message: string, data: any }>(BACKEND_URL + '/getAllPrograms')
      .pipe(map((programData) => {
        return programData.data;
      }))
      .subscribe((transformPrograms) => {
        this.programsMultiPurpose = transformPrograms;
        this.programsUpdated.next([...this.programsMultiPurpose]);
      });
  }

  getProgramUpdateListener() {
    return this.programsUpdated.asObservable();
  }

  /*  getProgram(){};

    updateProgram(){};

    removeProgram(){};
  */

}
