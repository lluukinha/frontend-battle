import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Output() DepartmentUpdated = new EventEmitter<any>();
  @Input() Department:any;
  DepartmentId:string = '';
  DepartmentName:string = '';

  ngOnInit(): void {
    this.DepartmentId = this.Department.DepartmentId;
    this.DepartmentName = this.Department.DepartmentName;
  }

  addDepartment() {
    const department = { DepartmentName: this.DepartmentName };
    this.service
      .addDepartment(department)
      .subscribe(response => {
        console.log(response.toString());
        this.DepartmentUpdated.emit();
      });
  }

  editDepartment() {
    const department = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };

    this.service
      .updateDepartment(department)
      .subscribe(response => {
        console.log(response.toString());
        this.DepartmentUpdated.emit();
      });
  }
}
