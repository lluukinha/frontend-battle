import React from "react";
import http from "../../../repositories/Repository.js";

import EditDepartment from '../EditDepartment/EditDepartment.js';

class ShowDepartment extends React.Component {

    constructor() {
      super();
      this.state = {
        DepartmentList: [],
        ModalTitle: '',
        ActivateEditComponent: false,
        Department: null
      };
    }

    componentDidMount() {
      this.refreshDepartmentList();
    }

    add = () => {
      this.setState({
        ModalTitle: 'Add Department',
        ActivateEditComponent: true,
        Department: {
          DepartmentId: 0,
          DepartmentName: ''
        },
      });
    }

    update = (department) => {
      this.setState({
        Department: department,
        ModalTitle: `Edit Department #${department.DepartmentId}`,
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
      this.refreshDepartmentList();
    }

    remove = (DepartmentId) => {
      http.deleteDepartment(DepartmentId)
        .then(({ data }) => {
          console.log(data);
          this.refreshDepartmentList();
        });
    }

    refreshDepartmentList = () => {
      http.getDepartmentList()
        .then(({ data }) => {
          this.setState({ DepartmentList: data });
        });
    }

    render() {
      const { DepartmentList, ModalTitle, Department } = this.state;

      const renderTr = (department) => {
        return (
          <tr key={ department.DepartmentId }>
            <td className="small text-muted text-center">
              <i>#{ department.DepartmentId }</i>
            </td>
            <td className="text-start">{ department.DepartmentName }</td>
            <td className="text-end">
              <button
                type="button"
                className="btn btn-sm btn-light mx-1"
                data-bs-toggle="modal"
                data-bs-target="#departmentModal"
                onClick={() => { this.update(department) }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => { this.remove(department.DepartmentId) }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      };

      const EditDepartmentComponent = (props) => {
        if (props.Department) {
          return (
            <EditDepartment
              Department={props.Department}
              departmentUpdated={this.listUpdated}
            />
          );
        }
        return '';
      };

      return (
      <div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary mt-2 mb-2"
            data-bs-toggle="modal"
            data-bs-target="#departmentModal"
            onClick={this.add}
          >
            Create new Department
          </button>
        </div>

        <div
          className="modal fade"
          id="departmentModal"
          tabIndex="-1"
          aria-labelledby="DepartmentLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="DepartmentLabel">
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
                <EditDepartmentComponent Department={Department} />
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-start">Department Name</th>
              <th className="text-end">Options</th>
            </tr>
          </thead>
          <tbody>
            { DepartmentList.map(renderTr) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowDepartment;
