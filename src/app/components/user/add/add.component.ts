import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add2.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  userDetailControl = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    birth: new FormControl(''),
    phone: new FormControl('', [Validators.min(9)]),
    address: new FormControl(''),
    user_role: new FormControl('2'),
    note: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    height: new FormControl(''),
    weight: new FormControl(''),
  });

  messageSuccess = '';
  messageError = '';
  isValid = false;
  url: any;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
  }

  getUser() {
    return this.userDetailControl.controls;
  }

  submit() {
    this.addUser();
  }
  addUser() {
    if (this.userDetailControl.status == 'VALID') {
      this.userService.create(this.userDetailControl.value).subscribe(
        (user) => {
          this.addStat(user.data.id);
          this.onFormSubmit(user.data.id);
          console.log(user.message);
          this.messageSuccess = `Utilisateur ajouter avec succée`;
          this.isValid = true;
        },
        (err) => {
          this.isValid = false;
          this.messageError = JSON.stringify(err);
        }
      );
    }
  }
  addStat(id) {
    this.userService
      .setStat(id, this.userDetailControl.value)
      .subscribe(() => {});
  }
  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }
  onFormSubmit(userId) {
    // if (!this.fileUploadForm.get('uploadedImage').value) {
    //   alert('Please fill valid details!');
    //   return false;
    // }

    const formData = new FormData();
    formData.append(
      'uploadedImage',
      this.fileUploadForm.get('uploadedImage').value
    );

    this.userService.createImage(userId, formData).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.uploadFileInput.nativeElement.value = '';
          this.fileInputLabel = undefined;
        }
      },
      (er) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }
  reset() {
    this.userDetailControl.reset({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      birht: '',
      phone: '',
      address: '',
      gender: '',
      note: '',
      height: '',
      weight: '',
    });
    this.messageError = '';
  }

  setValue() {
    this.userDetailControl.setValue({
      first_name: 'TAREB',
      last_name: 'mohamed amine',
      email: 'cyx@gmail.com',
      password: '111294',
      birth: new Date(1994, 11, 12),
      phone: '0552679950',
      address: 'rue dalger',
      user_role: '2',
      gender: 'male',
      note: 'nothing noticed',
      height: '1.70',
      weight: '70',
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
