import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServiceService} from '../../Services/service.service'
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  AddForm: FormGroup;
  submitAttempt: boolean = false;
  PhotoFilePath:string;
  constructor(public formBuilder: FormBuilder, private generalservices:ServiceService) {
    this.AddForm = this.formBuilder.group({
     FirstName: [null, [Validators.required,Validators.compose([ Validators.minLength(3),])]],
     LastName: [null, [Validators.required,Validators.compose([ Validators.minLength(3),])]],
     Email: [null,[Validators.compose([Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])]],
     Photo: [null,]
    });

   }

  ngOnInit(): void {
  }

  onSubmit(value) {
    this.submitAttempt = true;
    debugger
    let arr = [];
    if (this.AddForm.valid) {

      arr.push({
        first_name: value.FirstName,
        last_name: value.LastName,
        Email: value.Email,
        avatar:this.PhotoFilePath
      });

      let formData: FormData = new FormData();
      formData.append('emp', JSON.stringify(arr))
      this.generalservices.Postdata(formData).subscribe((res:any)=>{
        var data=res
        alert('Employee Saved Successfully. ')
        this.AddForm.reset();
        this.ngOnInit();
        console.log(data);
      },error=>{
        console.log('createemperror'+error)
      })
    } else if(value.FirstName==null||value.FirstName==undefined || value.FirstName==undefined){
      alert('FirstName is required')

    }
    else if(value.LastName==null||value.LastName==undefined || value.LastName==undefined){
      alert('LastName is required')

    }
    else if(value.Email==null||value.Email==undefined || value.Email==undefined){
      alert('Email is required')

    }


    }

    uploadPhoto(event){

      var file=event.target.files[0];

      this.PhotoFilePath=file;
      //this.AddForm.controls.Photo.setValue(this.PhotoFilePath);
    }
}
