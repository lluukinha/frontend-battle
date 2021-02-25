<template>
  <div>
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary mt-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#departmentModal"
        @click="add()"
      >
        Create new Department
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="departmentModal"
      tabindex="-1"
      aria-labelledby="DepartmentLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="DepartmentLabel">
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
          <div class="modal-body">
            <EditDepartment
              :Department="Department"
              @departmentUpdated="listUpdated()"
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
          <th class="text-start">Department Name</th>
          <th class="text-end">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="department in DepartmentList"
          :key="department.DepartmentId"
        >
          <td class="small text-muted text-center">
            <i>#{{ department.DepartmentId }}</i>
          </td>
          <td class="text-start">
            {{ department.DepartmentName }}
          </td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-light mx-1"
              data-bs-toggle="modal"
              data-bs-target="#departmentModal"
              @click="update(department)"
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-sm btn-light"
              @click="remove(department.DepartmentId)"
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
import EditDepartment from './EditDepartment.vue';

export default {
  name: 'ShowDepartment',

  components: {
    EditDepartment,
  },

  data() {
    return {
      ModalTitle: '',
      Department: null,
      DepartmentList: [],
      ActivateEditComponent: false,
    };
  },

  mounted() {
    this.refreshDepartmentList();
  },

  methods: {
    add() {
      this.Department = {
        DepartmentId: 0,
        DepartmentName: ''
      };

      this.ModalTitle = 'Add Department';
      this.ActivateEditComponent = true;
    },

    update(department) {
      this.Department = department;
      this.ModalTitle = `Edit Department #${department.DepartmentId}`;
      this.ActivateEditComponent = true;
    },

    closeModal() {
      document.getElementById('closeButton')?.click();
      this.ModalTitle = '';
      this.ActivateEditComponent = false;
    },

    remove(departmentId) {
      http
        .deleteDepartment(departmentId)
        .then(({ data }) => {
          console.log(data);
          this.refreshDepartmentList();
        });
    },

    listUpdated() {
      this.closeModal();
      this.refreshDepartmentList();
    },

    refreshDepartmentList() {
      http
        .getDepartmentList()
        .then(({ data }) => {
          this.DepartmentList = data;
        });
    },
  },
};
</script>

<style>

</style>
