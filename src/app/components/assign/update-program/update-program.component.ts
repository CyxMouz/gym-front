import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.component.html',
  styleUrls: ['./update-program.component.css'],
})
export class UpdateProgramComponent implements OnInit {
  dataList = [];
  displayedColumns: string[];
  constructor(private userService: UserService) {}
  dataSource;
  ngOnInit(): void {
    this.userService.getAllProgram().subscribe((data) => {
      data.forEach((element) => {
        let program = [];
        for (let index = 0; index < element.program.length; index++) {
          program.push({
            id: element.program[index].id,
            name: element.program[index].name,
          });
        }
        this.dataList.push({
          id: element.id,
          first_name: element.first_name,
          last_name: element.last_name,
          program: program,
        });
      });
      this.dataSource = [...this.dataList];

      this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
      this.dataSource = new MatTableDataSource(this.dataList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  refresh() {
    window.location.reload();
  }
  deleteProgram(userId, programId) {
    this.userService.deleteProgram(userId, programId).subscribe((data) => {
      console.log(data);
      for (let index = 0; index < this.dataList.length; index++) {
        if (this.dataList[index].id === userId) {
          for (let i = 0; i < this.dataList[index].program.length; i++) {
            if (this.dataList[index].program[i].id === programId) {
              this.dataList[index].program.splice(i, 1);
              return;
            }
          }
        }
      }
    });
  }
}
