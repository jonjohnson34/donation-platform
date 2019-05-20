import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../program.model';
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit, OnDestroy {

  dataSource: Program[] = [];
  displayedColumns = ['name', 'desc', 'amount', 'donated', 'edit', 'archive'];
  private programSub: Subscription;
  programs: Program[] = [];
  userRole: String;

  constructor(
    private programService: ProgramService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.programService.getPrograms();
    this.programSub = this.programService
      .getProgramUpdateListener()
      .subscribe((programs: Program[]) => {
        this.programs = programs;
      });
    this.userRole = this.auth.getRole();
  }

  onCreateClick() {
    this.router.navigate(['/program/create']);
  }


  ngOnDestroy() {
    this.programSub.unsubscribe();
  }

}
