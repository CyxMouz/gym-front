import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { interval, Observable } from 'rxjs';
import { map, startWith, timeInterval } from 'rxjs/operators';

import { ExerciseService } from 'src/app/services/exercise.service';
import { ProgramService } from 'src/app/services/program.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
})
export class FindComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  programControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private programService: ProgramService,
    private exerciseService: ExerciseService,
    private userService: UserService
  ) {}

  muscle = [];
  exercise = [];
  muscle_exercise = [];
  done = [];
  programInfo = false;
  programId;
  dropEvent;
  insertSearchBarValue: String;
  isValid = false;
  search = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[];
  updatedContent = false;
  updatedProgram = false;
  ngOnInit(): void {
    // this.exerciseService.getAll().subscribe((data) => {
    //   this.setListExercise(data);
    // });
    this.exerciseService.getAllMuscle().subscribe((data) => {
      this.setListMuscle(data);
    });
    this.programService.getAll().subscribe((data) => {
      this.filteredOptions = this.search.valueChanges.pipe(
        startWith(''),
        map((value) => data)
      );
    });
  }
  displayFn(program): string {
    if (program) {
      this.insertSearchBarValue = program.name;
      return program && program.name ? program.name : '';
    }
  }
  getProgram(program) {
    this.programId = program.id;
    this.programService.get(program.id).subscribe((program) => {
      this.setSearchedProgram(program);
    });
  }

  setSearchedProgram(program) {
    this.programControl.setValue({
      name: program.name,
      description: program.description,
    });

    this.programService
      .getProgramExercise(this.programId)
      .subscribe((response) => {
        console.log(this.programId);
        this.getMuscleExercise(response[0].exercises);
      });
  }
  getMuscleExercise(response) {
    let tab = [];
    if (response) {
      response.forEach((element) => {
        console.log(element);
        tab.push(element.id);
      });

      this.exerciseService.getAllFromProgram(tab).subscribe((data) => {
        this.muscle_exercise = data;
      });
      this.exerciseService.getAllNotInSelectedProgam(tab).subscribe((data) => {
        console.log(data);
        this.setListExercise(data);
      });
    } else {
      this.exerciseService.getAll().subscribe((data) => {
        this.setListExercise(data);
      });
    }
  }

  reset() {
    this.programControl.reset({
      name: '',
      description: '',
    });
    this.muscle_exercise = [''];
  }
  setValue() {
    this.programControl.setValue({
      name: 'Débutant',
      description:
        'pour said w les gens li ijiw daymen sans changement apparant',
    });
  }
  delete() {
    this.programService.delete(this.programId).subscribe(() => {
      this.programService.getAll().subscribe((data) => {
        this.filteredOptions = this.search.valueChanges.pipe(
          startWith(''),
          map((value) => data)
        );
      });

      this.insertSearchBarValue = '';
      this.reset();
    });
  }

  saveProgramInfo() {
    if (!this.programInfo) {
      this.programInfo = true;
      this.programControl.setValue(this.programControl.value);
      this.programService
        .update(this.programId, this.programControl.value)
        .subscribe((response) => {
          console.log('program update', this.programId);
          this.updatedProgram = false;
        });
    } else {
      this.programControl.setValue(this.programControl.value);
      this.programService
        .update(this.programId, this.programControl.value)
        .subscribe((response) => {
          console.log('program updated', response);
        });
    }
  }

  saveExerciseInfo = async () => {
    if (!this.programInfo) {
      //alert('sauvegarder le nom du programme svp !');
      this.updatedProgram = true;
    } else {
      this.updatedProgram = false;
      this.sendProgram();
      this.updatedContent = true;
    }
  };
  sendProgram() {
    this.programService
      .updateProgramExercise(this.programId, this.muscle_exercise)
      .subscribe((response) => {
        console.log('exerciseList ', response);
      });
  }

  close(e) {
    e.target.destroy();
  }

  setListExercise(exercise) {
    exercise.forEach((element) => {
      this.exercise.push(element);
    });
    // console.log('exercise table', this.exercise);
  }
  setListMuscle(muscle) {
    muscle.forEach((element) => {
      this.muscle.push(element);
    });
    //console.log('muscle table', this.muscle);
  }

  seriesChanged(event: any, data) {
    console.log('event value', event.target.value);
    data.default_series = event.target.value;
    console.log(data);
  }
  repitionsChanged(event: any, data) {
    console.log('event value', event.target.value);
    data.default_repitions = event.target.value;
    console.log(data);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.dropEvent = event;

    console.log('drop log', this.muscle_exercise);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
