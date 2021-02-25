import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any = [];
  ModalTitle:string = '';
  ActivateEditComponent:boolean = false;
  Employee:any;

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.service
      .getEmployeeList()
      .subscribe(data => {
        this.EmployeeList = data;
      });
  }

  add() {
    this.Employee = {
      EmployeeId: 0,
      EmployeeName: '',
      DepartmentId: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png'
    };

    this.ModalTitle = 'Add Employee';
    this.ActivateEditComponent = true;
  }

  update(employee:any) {
    this.Employee = employee;
    this.ModalTitle = `Edit Employee #${employee.EmployeeId}`;
    this.ActivateEditComponent = true;
  }

  closeModal() {
    document.getElementById('closeButton')?.click();
    this.ModalTitle = '';
    this.ActivateEditComponent = false;
  }

  listUpdated() {
    this.closeModal();
    this.refreshEmployeeList();
  }

  delete(EmployeeId:any) {
    this.service
      .deleteEmployee(EmployeeId)
      .subscribe(response => {
        console.log(response.toString());
        this.refreshEmployeeList();
      });
  }
}
