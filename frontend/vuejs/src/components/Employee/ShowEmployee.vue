<template>
  <div>
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary mt-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#employeeModal"
        @click="add()"
      >
        Create new Employee
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="employeeModal"
      tabindex="-1"
      aria-labelledby="EmployeeLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="EmployeeLabel">
              {{ ModalTitle }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal()"
              id="closeButton"
            ></button>
          </div>
          <div class="modal-body text-start">
            <EditEmployee
              :Employee="Employee"
              @employeeUpdated="listUpdated()"
              v-if="ActivateEditComponent"
            />
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th>Employee Name</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th class="text-end">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="employee in EmployeeList"
          :key="employee.EmployeeId"
        >
          <td class="small text-muted text-center">
            <i>#{{ employee.EmployeeId }}</i>
          </td>
          <td>{{ employee.EmployeeName }}</td>
          <td>{{ employee.DepartmentName }}</td>
          <td>{{ employee.DateOfJoining }}</td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-light mx-1"
              data-bs-toggle="modal"
              data-bs-target="#employeeModal"
              @click="update(employee)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-light"
              @click="remove(employee.EmployeeId)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import http from '../../repositories/Repository.js';
import EditEmployee from './EditEmployee.vue';

export default {
  name: 'ShowEmployee',

  components: {
    EditEmployee,
  },

  data() {
    return {
      EmployeeList: [],
      ModalTitle: '',
      ActivateEditComponent: false,
      Employee: null,
    };
  },

  mounted() {
    this.refreshEmployeeList();
  },

  methods: {
    refreshEmployeeList() {
      http
        .getEmployeeList()
        .then(({ data }) => {
          this.EmployeeList = data;
        });
    },

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
    },

    update(employee) {
      this.Employee = employee;
      this.ModalTitle = `Edit Employee #${employee.EmployeeId}`;
      this.ActivateEditComponent = true;
    },

    closeModal() {
      document.getElementById('closeButton')?.click();
      this.ModalTitle = '';
      this.ActivateEditComponent = false;
    },

    listUpdated() {
      this.closeModal();
      this.refreshEmployeeList();
    },

    remove(employeeId) {
      http
        .deleteEmployee(employeeId)
        .then(({ data }) => {
          console.log(data);
          this.refreshEmployeeList();
        });
    },
  },
};
</script>

<style>

</style>
