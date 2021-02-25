import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any = [];
  ModalTitle:string = '';
  ActivateEditComponent:boolean = false;
  Department:any;

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  add() {
    this.Department = {
      DepartmentId: 0,
      DepartmentName: ''
    };

    this.ModalTitle = 'Add Department';
    this.ActivateEditComponent = true;
  }

  update(department:any) {
    this.Department = department;
    this.ModalTitle = `Edit Department #${department.DepartmentId}`;
    this.ActivateEditComponent = true;
  }

  closeModal() {
    document.getElementById('closeButton')?.click();
    this.ModalTitle = '';
    this.ActivateEditComponent = false;
  }

  listUpdated() {
    this.closeModal();
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    this.service.getDepartmentList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  delete(DepartmentId:any) {
    this.service
      .deleteDepartment(DepartmentId)
      .subscribe(response => {
        console.log(response.toString());
        this.refreshDepartmentList();
      });
  }
}
