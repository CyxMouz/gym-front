import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as EventEmitter from 'events';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
})
export class FindComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  insertSearchBarValue: String;
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
    height: new FormControl(''),
    weight: new FormControl(''),
    user_role: new FormControl('2'),
    note: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
  });
  messageSuccess = '';
  messageError = '';
  isValid = false;
  search = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[];
  userId;
  deletedUser = false;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  url: any;
  imageUpdated = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.filteredOptions = this.search.valueChanges.pipe(
        startWith(''),
        map((value) => data)
      );
    });

    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });

    // this.filteredOptions = this.search.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );
  }
  displayFn(user): string {
    if (user) {
      this.insertSearchBarValue = user.first_name + ' ' + user.last_name;
    }

    return user && user.first_name + ' ' + user.last_name
      ? user.first_name + ' ' + user.last_name
      : '';
  }

  getUser(user) {
    this.userId = user.id;
    this.userService.get(user.id).subscribe((user) => {
      this.setSearchedUser(user);
    });
    this.userService.getImage(user.id).subscribe((image) => {
      this.setImageUser(image);
    });
  }

  setSearchedUser(user) {
    this.userDetailControl.setValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      birth: user.birth,
      phone: user.phone,
      address: user.address,
      user_role: user.user_role,
      gender: user.gender,
      note: user.note,
      height: user.user_stats[0].height,
      weight: user.user_stats[0].last_weight,
    });
  }
  setImageUser(image) {
    this.fileUploadForm.setValue({
      uploadedImage: image,
    });
    var reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }
  submit() {
    console.log(this.userDetailControl.status);
    if (this.userDetailControl.status == 'VALID') {
      this.userService
        .update(this.userId, this.userDetailControl.value)
        .subscribe(
          (user) => {
            this.updateStat(this.userId, this.userDetailControl.value);
            this.onFormSubmit(this.userId);
            this.messageSuccess = `Utilisateur modifier avec succée${user}`;
            this.isValid = true;
            console.log(this.userDetailControl.value);
          },
          (err) => {
            this.isValid = false;
            this.messageError = JSON.stringify(err);
          }
        );
    }
  }
  updateStat(id, data) {
    this.userService.updateState(id, data).subscribe();
  }
  reset() {
    this.reloadPage();
  }

  // setValue() {
  //   this.userDetailControl.setValue({
  //     first_name: 'TAREB',
  //     last_name: 'mohamed amine',
  //     email: 'cyx@gmail.com',
  //     password: '111294',
  //     birth: new Date(1994, 11, 12),
  //     phone: '0552679950',
  //     address: 'rue dalger',
  //     user_role: '2',
  //     gender: 'male',
  //     note: 'nothing',
  //     height: '',
  //     weight: '',
  //   });
  // }

  delete() {
    if (this.userId) {
      this.userService.delete(this.userId).subscribe();
      this.reloadPage();
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.url = reader.result;
      this.imageUpdated = true;
    };
  }
  onFormSubmit(userId) {
    if (this.imageUpdated) {
      const formData = new FormData();
      formData.append(
        'uploadedImage',
        this.fileUploadForm.get('uploadedImage').value
      );

      this.userService.updateImage(userId, formData).subscribe(
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
  }

  reloadPage(): void {
    window.location.reload();
  }
}
