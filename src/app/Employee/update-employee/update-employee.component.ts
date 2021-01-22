import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import { ServiceService} from '../../Services/service.service'

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  empdata:any;
  UpdateForm: FormGroup;
  submitAttempt: boolean = false;
  PhotoFilePath:string;
  constructor(public formBuilder: FormBuilder, private generalservices:ServiceService) {
    this.UpdateForm = this.formBuilder.group({
     FirstName: [null, [Validators.required,Validators.compose([ Validators.minLength(3),])]],
     LastName: [null, [Validators.required,Validators.compose([ Validators.minLength(3),])]],
     Email: [null,[Validators.compose([Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])]],
     Photo: [null,]
    });

   }


  ngOnInit(): void {
    this.generalservices.updateEmp.subscribe((res1:any)=>{
this.empdata=res1
      console.log(res1)

     this.getemployee();
    },error=>{
      console.log(error)
    })

  }
  getemployee(){
    debugger
    // this.UpdateForm.setValue({
    //   FirstName:this.empdata.first_name,
    //   LastName:this.empdata.last_name,
    //   Email:this.empdata.email,
    //   Photo:this.empdata.avatar,
    // })
    // this.UpdateForm = this.formBuilder.group({
    //   FirstName: [this.empdata.first_name, Validators.required,Validators.compose([ Validators.minLength(3),])],
    //   LastName: [this.empdata.last_name, Validators.required,Validators.compose([ Validators.minLength(3),])],
    //   Email: [this.empdata.email,Validators.compose([Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
    //   Photo: [this.empdata.avatar,]
     //});
     this.UpdateForm.controls.FirstName.setValue(this.empdata.first_name)
     this.UpdateForm.controls.LastName.setValue(this.empdata.last_name)
     this.UpdateForm.controls.Email.setValue(this.empdata.email)

    debugger
  }



  Update(value) {

    this.submitAttempt = true;
    debugger
    let arr = [];
    if (this.UpdateForm.valid) {

      arr.push({
          id:value.id,
          first_name: value.FirstName,
          last_name: value.LastName,
          email: value.Email,
          avatar:this.PhotoFilePath

      });

      let formData: FormData = new FormData();
      formData.append('emp', JSON.stringify(arr))
      this.generalservices.Putdata(formData).subscribe((res:any)=>{
        var data=res
        alert( value.FirstName +'Updated Successfully. ' )
        console.log(data);
      },error=>{
        console.log('updateemperror'+error)
      })
    }
    else if(value.FirstName==null||value.FirstName==undefined || value.FirstName==undefined){
      alert('FirstName is required')

    }
    else if(value.LastName==null||value.LastName==undefined || value.LastName==undefined){
      alert('LastName is required')

    }
    else if(value.Email==null||value.Email==undefined || value.Email==undefined){
      alert('Email is required')

    }

    }


    Remove(value) {
      let formData: FormData = new FormData();
      formData.append('emp', JSON.stringify(value.id))
      this.generalservices.deletedata(formData).subscribe((res1:any)=>{
        var data=res1;
        alert('Remove  Successfully. ')
        console.log(data);
      },error=>{
        console.log('deleteemperror'+error)
      })
    }

    uploadPhoto(event){

      var file=event.target.files[0];

      this.PhotoFilePath=file;
      this.UpdateForm.controls.Photo.setValue(this.PhotoFilePath);
    }
}
