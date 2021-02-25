<template>
  <div>
    <div class="mb-1 d-flex justify-content-center">
      <label for="photo_input" class="form-label">
        <img
          :src="profileSourceUrl"
          class="img-fluid img-thumbnail rounded thumb"
        />
      </label>
    </div>

    <div
      class="mb-3 d-flex justify-content-center"
      v-if="PhotoFileName !== 'anonymous.png'"
    >
      <button @click="removePhoto()" class="btn btn-light">
        Remove Photo
      </button>
    </div>

    <div class="mb-3">
      <label for="employee_name_input" class="form-label">
        Employee Name
      </label>
      <input
        id="employee_name_input"
        type="text"
        class="form-control"
        v-model="EmployeeName"
        placeholder="Enter Employee Name"
      />
    </div>

    <div class="mb-3">
      <label for="employee_department_select" class="form-label">
        Department
      </label>
      <select
        id="employee_department_select"
        v-model="DepartmentId"
        class="form-control"
      >
        <option
          v-for="department in DepartmentList"
          :value="department.DepartmentId"
          :key="department.DepartmentId"
        >
          {{ department.DepartmentName }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="date_of_joining_input" class="form-label">
        Date of Joining
      </label>
      <input
        type="date"
        class="form-control"
        id="date_of_joining_input"
        v-model="DateOfJoining"
      />
    </div>

    <div class="mb-3">
      <label for="photo_input" class="form-label">
        Profile Photo
      </label>
      <input
        type="file"
        class="form-control"
        id="photo_input"
        @change="uploadPhoto"
      />
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-primary"
        v-if="Employee.EmployeeId === 0"
        @click="addEmployee()"
      >
        Add Employee
      </button>
      <button
        class="btn btn-primary"
        @click="editEmployee()"
        v-else
      >
        Update Employee
      </button>
    </div>
  </div>
</template>

<script>
import http from '../../repositories/Repository.js';

export default {
  name: 'EditEmployee',

  props: {
    Employee: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      DepartmentList: [],
      EmployeeId: '',
      EmployeeName: '',
      DepartmentId: '',
      DateOfJoining: '',
      PhotoFileName: '',
    };
  },

  mounted() {
    this.EmployeeId = this.Employee.EmployeeId;
    this.EmployeeName = this.Employee.EmployeeName;
    this.DateOfJoining = this.Employee.DateOfJoining;
    this.PhotoFileName = this.Employee.PhotoFileName;
    this.getDepartmentList();
  },

  computed: {
    profileSourceUrl() {
      return `${http.PhotoUrl}/${this.PhotoFileName}`;
    },
  },

  methods: {
    getDepartmentList() {
      http
        .getDepartmentList()
        .then(({ data }) => {
          this.DepartmentList = data;
          const DepartmentId = this.Employee.DepartmentId === 0
            ? data[0].DepartmentId
            : this.Employee.DepartmentId;
          this.DepartmentId = DepartmentId;
        });
    },

    addEmployee() {
      const employee = {
        EmployeeName: this.EmployeeName,
        DepartmentId: this.DepartmentId,
        DateOfJoining: this.DateOfJoining,
        PhotoFileName: this.PhotoFileName
      };

      http
        .addEmployee(employee)
        .then(({ data }) => {
          console.log(data);
          this.$emit('employeeUpdated');
        });
    },

    editEmployee() {
      const employee = {
        EmployeeId: this.EmployeeId,
        EmployeeName: this.EmployeeName,
        DepartmentId: this.DepartmentId,
        DateOfJoining: this.DateOfJoining,
        PhotoFileName: this.PhotoFileName
      };

      http
        .updateEmployee(employee)
        .then(({ data }) => {
          console.log(data);
          this.$emit('employeeUpdated');
        });
    },

    uploadPhoto(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('uploadedFile', file, file.name);

      http
        .UploadPhoto(formData)
        .then(({ data }) => {
          this.PhotoFileName = data;
        });
    },

    removePhoto() {
      this.PhotoFileName = 'anonymous.png';
    },
  },
};

</script>

<style scoped>
.thumb {
  max-width: 200px;
}
</style>
