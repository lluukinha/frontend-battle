<template>
  <div class="text-start">
    <div class="mb-3">
      <label for="department_name_input" class="form-label">
        Department Name
      </label>
      <input
        id="department_name_input"
        type="text"
        class="form-control"
        v-model="DepartmentName"
        placeholder="Enter Department Name"
      />
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-primary"
        v-if="Department.DepartmentId == 0"
        @click="addDepartment()"
      >
        Add Department
      </button>
      <button
        class="btn btn-primary"
        @click="editDepartment()"
        v-else
      >
        Update Department
      </button>
    </div>
  </div>
</template>

<script>
import http from '../../repositories/Repository.js';

export default {
  name: 'EditDepartment',

  props: {
    Department: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      DepartmentId: '',
      DepartmentName: '',
    };
  },

  mounted() {
    this.DepartmentId = this.Department.DepartmentId;
    this.DepartmentName = this.Department.DepartmentName;
  },

  methods: {
    addDepartment() {
      const department = { DepartmentName: this.DepartmentName };
      http
        .addDepartment(department)
        .then(({ data }) => {
          console.log(data);
          this.$emit('departmentUpdated');
        });
    },

    editDepartment() {
      const department = {
        DepartmentId: this.DepartmentId,
        DepartmentName: this.DepartmentName
      };

      http
        .updateDepartment(department)
        .then(({ data }) => {
          console.log(data);
          this.$emit('departmentUpdated');
        });
    },
  },
}
</script>

<style>

</style>
