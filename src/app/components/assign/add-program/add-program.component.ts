import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ProgramService } from 'src/app/services/program.service';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
}
export interface Program {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
})
export class AddProgramComponent implements OnInit {
  constructor(
    private userService: UserService,
    private programService: ProgramService
  ) {}

  userControl = new FormControl('');
  programControl = new FormControl('');
  options: User[] = [];
  options2: Program[];
  UserArray: any[] = [];
  filteredOptions: Observable<User[]>;
  programName: string;
  programList: string[] = [];
  username;
  userId;
  programId;
  ngOnInit() {
    this.userService.getAllWithProgram().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        this.options.push({
          id: data[index].id,
          first_name: data[index].first_name,
          last_name: data[index].last_name,
        });
      }
    });
    this.programService.getAllWithExercise().subscribe((data) => {
      data.forEach((element) => {
        this.programList.push(element);
      });
    });
  }
  getUserId(id) {
    this.userId = id;
  }
  getProgramId(id) {
    this.programId = id;
  }
  displayUsers() {
    this.filteredOptions = this.userControl.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string'
          ? value
          : value?.first_name + ' ' + value?.last_name
      ),
      map((value) => (value ? this._filter(value) : this.options.slice()))
    );
  }

  displayFn(user: User): string {
    return (
      user && user.first_name,
      user.last_name,
      user.id ? user.first_name + ' ' + user.last_name : ''
    );
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    this.username = filterValue;
    return this.options.filter((option) =>
      option.first_name.toLowerCase().includes(filterValue)
    );
  }
  onSubmit() {
    console.log('=> ', this.userId, ' => ', this.programId);
    let data = { userId: this.userId, programId: this.programId };
    this.userService.createProgram(data).subscribe((data) => {
      console.log(data);
      this.displayUsers();
    });
  }
}
