import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
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
  days: string[] = [
    'samedi',
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
  ];
  tab = [];
  muscle = [];
  exercise = [];
  muscle_exercise = [];
  muscle_exercise_previous = [];
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
  program;
  alldata;
  updatedContentSucess = false;
  updatedContentFaill = false;

  ngOnInit(): void {
    this.exerciseService.getAllMuscle().subscribe((data) => {
      this.setListMuscle(data);
    });

    this.programService.getAll().subscribe((data) => {
      this.alldata = data;
      this.filteredOptions = this.search.valueChanges.pipe(
        startWith(''),
        map((value) => data)
      );
    });
  }
  displayFn(program): string {
    this.muscle_exercise = [];
    this.tab = [];
    this.program = program;
    if (program) {
      this.insertSearchBarValue = program.name;

      return program && program.name ? program.name : '';
    }
  }

  getProgram(program) {
    this.program = program;
    this.programId = program.id;
    this.programService.get(program.id).subscribe((program) => {
      this.setSearchedProgram(program);
    });
  }
  getProgram2(program) {
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
      .subscribe((fullProgram) => {
        this.getMuscleExercise(fullProgram);
      });
  }
  getMuscleExercise(fullProgram) {
    let programUser = [];

    if (fullProgram) {
      fullProgram.forEach((element) => {
        /* program utilisateur */

        element.exercises.forEach((e) => {
          this.muscle_exercise.push(e);

          this.tab.push(e.id);
        });
      });

      this.exerciseService
        .getAllNotInSelectedProgam(this.tab)
        .subscribe((data) => {
          this.setListExercise(data);
        });
    } else {
      this.exerciseService.getAll().subscribe((data) => {
        this.setListExercise(data);
      });
    }
  }
  setDay(event: any, data, day) {
    data.day = day;
    if (data.exercise_program != undefined) {
      data.exercise_program.day = day;
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
      console.log(this.programControl.value);
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
      this.updatedContentFaill = true;
    } else {
      this.updatedProgram = false;
      this.sendProgram();
      this.updatedContentSucess = true;
      this.updatedContent = true;
    }
  };
  sendProgram() {
    let tab = [];
    let def_series;
    let def_repitions;
    let def_day;
    this.muscle_exercise.forEach((element) => {
      console.log(element.exercise_program.series);
      if (element.exercise_program != undefined) {
        def_series = element.exercise_program.series;
      } else {
        def_series = element.default_series;
      }
      if (element.exercise_program != undefined) {
        def_repitions = element.exercise_program.repitions;
      } else {
        def_repitions = element.default_repitions;
      }
      if (element.exercise_program != undefined) {
        def_day = element.exercise_program.day;
      } else {
        def_day = element.day || '';
      }

      tab.push({
        id: element.id,

        series: def_series,

        repitions: def_repitions,

        day: def_day,
      });
    });
    console.log('####', tab);
    this.programService
      .updateProgramExercise(this.programId, tab)
      .subscribe((response) => {
        this.muscle_exercise = [];
        this.tab = [];
        this.getProgram2(this.program);
        console.log('exerciseList ', response);
      });
  }

  close(e) {
    e.target.destroy();
  }

  setListExercise(exercise) {
    exercise.forEach((element) => {
      let exercise_program;
      if (element.exercise_program == undefined) {
        exercise_program = {
          series: '',
          repitions: '',
          day: '',
        };
      }
      element.exercise_program = exercise_program;
      this.exercise.push(element);
    });
    console.log('exercise table', this.exercise);
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
    console.log('series changed', data);
    if (data.exercise_program != undefined) {
      data.exercise_program.series = event.target.value;
    }
    console.log(data);
  }
  repitionsChanged(event: any, data) {
    console.log('event value', event.target.value);
    data.default_repitions = event.target.value;
    if (data.exercise_program != undefined) {
      data.exercise_program.repitions = event.target.value;
    }
    console.log(data);
  }

  seriesChangedUpdate(event: any, data) {
    console.log('series', data);
    if (data.exercise_program != undefined) {
      data.exercise_program.series = event.target.value;
    }
  }
  repitionsChangedUpdate(event: any, data) {
    console.log('rep', data);
    if (data.exercise_program != undefined) {
      data.exercise_program.repitions = event.target.value;
    }
  }
  CloseAlertSucess() {
    if (this.updatedContent === true) {
      this.updatedContentSucess = false;
    }
  }
  CloseAlertFaill() {
    if (this.updatedContent === false) {
      this.updatedContentFaill = false;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    this.dropEvent = event;

    console.log('drop log', this.muscle_exercise);
    //exercise_program: {series: '', repitions: '', day : ''
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('dd', event.container.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
