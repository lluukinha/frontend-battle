import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Output() EmployeeUpdated = new EventEmitter<any>();
  @Input() Employee:any;
  DepartmentList:any = [];
  EmployeeId:string = '';
  EmployeeName:string = '';
  DepartmentId:string = '';
  DateOfJoining:string = '';
  PhotoFileName:string = '';

  ngOnInit(): void {
    this.EmployeeId = this.Employee.EmployeeId;
    this.EmployeeName = this.Employee.EmployeeName;
    this.DateOfJoining = this.Employee.DateOfJoining;
    this.PhotoFileName = this.Employee.PhotoFileName;
    this.getDepartmentList();
  }

  profileSourceUrl(): string {
    const url = this.service.getImagesUrl();
    return `${url}/${this.PhotoFileName}`;
  }

  getDepartmentList() {
    this.service
      .getDepartmentList()
      .subscribe(data => {
        this.DepartmentList = data;

        const DepartmentId = this.Employee.DepartmentId == 0
          ? data[0].DepartmentId
          : this.Employee.DepartmentId;
        this.DepartmentId = DepartmentId;
      });
  }

  addEmployee() {
    const employee = {
      EmployeeName: this.EmployeeName,
      DepartmentId: this.DepartmentId,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.service
      .addEmployee(employee)
      .subscribe(response => {
        console.log(response.toString());
        this.EmployeeUpdated.emit();
      });
  }

  editEmployee() {
    const employee = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      DepartmentId: this.DepartmentId,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };

    this.service
      .updateEmployee(employee)
      .subscribe(response => {
        console.log(response.toString());
        this.EmployeeUpdated.emit();
      });
  }

  uploadPhoto(event:any) {
    const file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service
      .UploadPhoto(formData)
      .subscribe((FileName:any) => {
        this.PhotoFileName = FileName;
      });
  }

  removePhoto() {
    this.PhotoFileName = 'anonymous.png';
  }
}
