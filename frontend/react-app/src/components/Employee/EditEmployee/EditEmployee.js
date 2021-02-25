import React from "react";
import http from "../../../repositories/Repository.js";

import './EditEmployee.css';

class EditEmployee extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        EmployeeId: props.Employee.EmployeeId,
        EmployeeName: props.Employee.EmployeeName,
        DepartmentId: props.Employee.DepartmentId,
        DateOfJoining: props.Employee.DateOfJoining,
        PhotoFileName: props.Employee.PhotoFileName,
        DepartmentList: []
      };
    }

    componentDidMount() {
      this.refreshDepartmentList();
    }

    refreshDepartmentList = () => {
      http.getDepartmentList()
        .then(({ data }) => {
          this.setState({ DepartmentList: data });
        });
    }

    changeName = (event) => {
      this.setState({ EmployeeName: event.target.value });
    };

    changeDepartment = (event) => {
      this.setState({ DepartmentId: event.target.value });
    };

    changeDateOfJoining = (event) => {
        this.setState({ DateOfJoining: event.target.value });
    };

    addEmployee = () => {
      const {
        EmployeeName,
        DepartmentId,
        DateOfJoining,
        PhotoFileName
      } = this.state;

      const employee = {
        EmployeeName,
        DepartmentId,
        DateOfJoining,
        PhotoFileName
      };

      http.addEmployee(employee)
        .then(({ data }) => {
          console.log(data);
          this.props.employeeUpdated();
        });
    };

    editEmployee = () => {
      const employee = this.state;
      http.updateEmployee(employee)
        .then(({ data }) => {
          console.log(data);
          this.props.employeeUpdated();
        });
    }

    profileSourceUrl = () => {
      const url = http.PhotoUrl;
      return `${url}/${this.state.PhotoFileName}`;
    };

    removePhoto = () => {
      this.setState({ PhotoFileName: 'anonymous.png' });
    }

    uploadPhoto = (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('uploadedFile', file, file.name);
      http.UploadPhoto(formData)
        .then(({ data }) => {
          this.setState({ PhotoFileName: data });
        });
    }

    render() {
      const {
        EmployeeId,
        EmployeeName,
        PhotoFileName,
        DepartmentId,
        DepartmentList,
        DateOfJoining
      } = this.state;

      const ShowButton = (props) => {
        const { EmployeeId } = props;
        if (EmployeeId === 0 || EmployeeId === '0') {
          return (
            <button
              className="btn btn-primary"
              onClick={this.addEmployee}
            >
              Add Employee
            </button>
          );
        }

        return (
          <button
            className="btn btn-primary" onClick={this.editEmployee}>
            Edit Employee
          </button>
        );
      };

      const ShowRemoveImageButton = ({ PhotoFileName }) => {
        if (PhotoFileName === 'anonymous.png') return '';

        return (
          <div className="mb-3 d-flex justify-content-center">
            <button onClick={this.removePhoto} className="btn btn-light">
              Remove Photo
            </button>
          </div>
        );
      };

      const renderOption = (department) => {
        return (
          <option
            value={department.DepartmentId}
            key={department.DepartmentId}
          >
            { department.DepartmentName }
          </option>
        );
      };

      return (
          <div>
            <div className="mb-1 d-flex justify-content-center">
              <label htmlFor="photo_input" className="form-label">
                <img
                  alt=""
                  src={this.profileSourceUrl()}
                  className="img-fluid img-thumbnail rounded thumb"
                />
              </label>
            </div>

            <ShowRemoveImageButton PhotoFileName={PhotoFileName} />

            <div className="mb-3">
              <label htmlFor="employee_name_input" className="form-label">
                Employee Name
              </label>
              <input
                id="employee_name_input"
                type="text"
                className="form-control"
                value={EmployeeName}
                onChange={this.changeName}
                placeholder="Enter Employee Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="employee_department_select" className="form-label">
                Department
              </label>
              <select
                id="employee_department_select"
                value={DepartmentId}
                className="form-control"
                onChange={this.changeDepartment}
              >
                { DepartmentList.map(renderOption) }
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date_of_joining_input" className="form-label">
                Date of Joining
              </label>
              <input
                type="date"
                className="form-control"
                id="date_of_joining_input"
                value={DateOfJoining}
                onChange={this.changeDateOfJoining}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo_input" className="form-label">
                Profile Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="photo_input"
                onChange={this.uploadPhoto}
              />
            </div>

            <div className="d-flex justify-content-end">
              <ShowButton EmployeeId={EmployeeId} />
            </div>
          </div>
    );
  }
}

export default EditEmployee;
