import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CdkObserveContent } from '@angular/cdk/observers';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ProgramService } from 'src/app/services/program.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
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

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe((data) => {
      this.setListExercise(data);
    });
    this.exerciseService.getAllMuscle().subscribe((data) => {
      this.setListMuscle(data);
    });
  }

  submit() {}
  reset() {
    this.programControl.reset({
      name: '',
      description: '',
    });
    this.muscle_exercise = [];
  }
  setValue() {
    this.programControl.setValue({
      name: 'Débutant',
      description:
        'pour said w les gens li ijiw daymen sans changement apparant',
    });
  }

  saveProgramInfo() {
    if (!this.programInfo) {
      this.programInfo = true;
      this.programControl.setValue(this.programControl.value);
      this.programService
        .create(this.programControl.value)
        .subscribe((response) => {
          this.programId = response.data.id;
          console.log('program created', this.programId);
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
      alert('sauvegarder le nom du programme svp !');
    } else {
      this.sendProgram();
    }
  };
  sendProgram() {
    this.programService
      .createProgramExercise(this.programId, this.muscle_exercise)
      .subscribe((response) => {
        console.log('exerciseList ', response);
      });
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

    console.log(this.muscle_exercise);
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
