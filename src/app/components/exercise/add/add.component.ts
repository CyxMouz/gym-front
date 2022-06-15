import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  exerciseList;
  exerciseImageList = [];
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  // fileUploadForm: FormGroup;
  fileUploadForm = this.formBuilder.group({
    uploadedImage: [''],
  });
  fileInputLabel: string;
  url = [];
  exerciseId;
  exercise_rep_ser = [];

  constructor(
    private exerciseService: ExerciseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe((data) => {
      this.exerciseList = data;
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        if (data[index].exercise_images[0]) {
          this.url.push(data[index].exercise_images[0].name);
        }
      }

      // for (let index = 0; index < data.length; index++) {
      //   this.exerciseImageList.push([data.id,data.name,data.description,data.default_series,data.default_repitions,])

      // }
    });
    // this.exerciseService.getAllImage().subscribe((data) => {
    //   data.forEach((element) => {
    //     for (let i = 0; i < element.length; i++) {
    //       if (element.length > 1) {
    //       }
    //     }
    //   });
    //   //this.exerciseList = data.
    //   //this.exerciseImageList = data;
    //   //console.log(data);
    // });
  }
  setImageUser(image) {
    // this.fileUploadForm.setValue({
    //   uploadedImage: image,
    // });
    // var reader = new FileReader();
    // reader.readAsDataURL(image);
    // reader.onload = (_event) => {
    //   this.url.push(reader.result);
    // };
    //this.url.push(image);
  }
  insertRepition(event, exerciseId) {
    let data = {
      default_repitions: event.target.value,
    };
    this.exerciseService.update(exerciseId, data).subscribe((data) => {
      console.log(data);
    });
  }
  insertSeries(event, exerciseId) {
    let data = {
      default_series: event.target.value,
    };

    this.exerciseService.update(exerciseId, data).subscribe((data) => {
      console.log(data);
    });
  }

  onFileSelect = async (event, exerciseId, i) => {
    this.exerciseId = exerciseId;

    const file = event.target.files[0];

    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url[i] = reader.result;
    };
  };
  onFormSubmit(exerciseId) {
    // if (!this.fileUploadForm.get('uploadedImage').value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    const formData = new FormData();
    formData.append(
      'uploadedImage',
      this.fileUploadForm.get('uploadedImage').value
    );

    this.exerciseService.createImage(exerciseId, formData).subscribe(
      (response) => {
        console.log(response);
        if (response.statusCode === 200) {
          // this.uploadFileInput.nativeElement.value = '';
          // this.fileInputLabel = undefined;
        }
      },
      (er) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }
}
