import React from "react";
import http from "../../../repositories/Repository.js";

class EditDepartment extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        DepartmentId: props.Department.DepartmentId,
        DepartmentName: props.Department.DepartmentName
      };
    }

    changeName = (event) => {
      this.setState({ DepartmentName: event.target.value });
    };

    addDepartment = () => {
      const department = { DepartmentName: this.state.DepartmentName };
      http.addDepartment(department)
        .then(({ data }) => {
          console.log(data);
          this.props.departmentUpdated();
        });
    };

    editDepartment = () => {
      const department = this.state;
      http.updateDepartment(department)
        .then(({ data }) => {
          console.log(data);
          this.props.departmentUpdated();
        });
    }

    render() {
      const { DepartmentId, DepartmentName } = this.state;

      const ShowButton = (props) => {
        const { DepartmentId } = props;
        if (DepartmentId === 0 || DepartmentId === '0') {
          return (
            <button className="btn btn-primary" onClick={this.addDepartment}>
              Add Department
            </button>
          );
        }

        return (
          <button className="btn btn-primary" onClick={this.editDepartment}>
            Edit Department
          </button>
        );
      };

      return (
          <div>
            <div className="mb-3">
              <label htmlFor="department_name_input" className="form-label">
                Department Name
              </label>
              <input
                id="department_name_input"
                type="text"
                className="form-control"
                value={DepartmentName}
                onChange={this.changeName}
                placeholder="Enter Department Name"
              />
            </div>

            <div className="d-flex justify-content-end">
              <ShowButton DepartmentId={DepartmentId} />
            </div>
          </div>
    );
  }
}

export default EditDepartment;
