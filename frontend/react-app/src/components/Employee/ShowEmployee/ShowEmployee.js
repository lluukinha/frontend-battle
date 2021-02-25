import React from "react";
import http from "../../../repositories/Repository.js";

import EditEmployee from '../EditEmployee/EditEmployee.js';

class ShowEmployee extends React.Component {

    constructor() {
      super();
      this.state = {
        EmployeeList: [],
        ModalTitle: '',
        ActivateEditComponent: false,
        Employee: null
      };
    }

    componentDidMount() {
      this.refreshEmployeeList();
    }

    add = () => {
      this.setState({
        ModalTitle: 'Add Employee',
        ActivateEditComponent: true,
        Employee: {
          EmployeeId: 0,
          EmployeeName: '',
          PhotoFileName: 'anonymous.png'
        },
      });
    }

    update = (employee) => {
      this.setState({
        Employee: employee,
        ModalTitle: `Edit Employee #${employee.EmployeeId}`,
        ActivateEditComponent: true,
      });
    }

    closeModal = () => {
      document.getElementById('closeButton')?.click();
      this.setState({
        ModalTitle: '',
        ActivateEditComponent: false,
      });
    }

    listUpdated = () => {
      this.closeModal();
      this.refreshEmployeeList();
    }

    remove = (EmployeeId) => {
      http.deleteEmployee(EmployeeId)
        .then(({ data }) => {
          console.log(data);
          this.refreshEmployeeList();
        });
    }

    refreshEmployeeList = () => {
      http.getEmployeeList()
        .then(({ data }) => {
          this.setState({ EmployeeList: data });
        });
    }

    render() {
      const { EmployeeList, ModalTitle, Employee } = this.state;

      const EditEmployeeComponent = (props) => {
        if (!props.Employee) return '';
        return (
          <EditEmployee
            Employee={props.Employee}
            employeeUpdated={this.listUpdated}
          />
        );
      };

      const renderTr = (employee) => {
        return (
          <tr key={employee.EmployeeId}>
            <td className="small text-muted text-center">
              <i>#{ employee.EmployeeId }</i>
            </td>
            <td className="text-start">{ employee.EmployeeName }</td>
            <td className="text-end">
              <button
                type="button"
                className="btn btn-sm btn-light mx-1"
                data-bs-toggle="modal"
                data-bs-target="#employeeModal"
                onClick={() => { this.update(employee) }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => { this.remove(employee.EmployeeId) }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      };

      return (
      <div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mt-2 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#employeeModal"
            onClick={this.add}
          >
            Create new Employee
          </button>
        </div>

        <div
          className="modal fade"
          id="employeeModal"
          tabIndex="-1"
          aria-labelledby="EmployeeLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="EmployeeLabel">
                  { ModalTitle }
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeModal}
                  id="closeButton"
                ></button>
              </div>
              <div className="modal-body text-start">
                <EditEmployeeComponent Employee={Employee} />
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-start">Employee Name</th>
              <th className="text-end">Options</th>
            </tr>
          </thead>
          <tbody>
            { EmployeeList.map(renderTr) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowEmployee;
