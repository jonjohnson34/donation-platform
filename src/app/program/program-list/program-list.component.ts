import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../program.model';
import { Subscription, from } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    private programService: ProgramService,
    private router: Router
  ) { }

  ngOnInit() {
    this.programService.getPrograms();
    this.programSub = this.programService
      .getProgramUpdateListener()
      .subscribe((programs: Program[]) => {
        this.programs = programs;
      });
  }

  onCreateClick() {
    this.router.navigate(['/program/create']);
  }


  ngOnDestroy() {
    this.programSub.unsubscribe();
  }

}
