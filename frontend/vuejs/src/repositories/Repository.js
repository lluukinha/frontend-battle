import axios from 'axios';
const APIUrl = 'https://localhost:5001/api';
const PhotoUrl = 'https://localhost:5001/Photos';
const DepartmentUrl = `${APIUrl}/department`;
const EmployeeUrl = `${APIUrl}/employee`;

/*
  Department Routes
*/

const getDepartmentList = async () => {
  return axios.get(DepartmentUrl);
};

const addDepartment = async (department) => {
  return axios.post(DepartmentUrl, department);
}

const updateDepartment = async (department) => {
  return axios.put(DepartmentUrl, department);
}

const deleteDepartment = async (departmentId) => {
  const url = `${DepartmentUrl}/${departmentId}`;
  return axios.delete(url);
}

/*
  Employee Routes
*/

const getEmployeeList = async () => {
  return axios.get(EmployeeUrl);
}

const addEmployee = async (employee) => {
  return axios.post(EmployeeUrl, employee);
}

const updateEmployee = async (employee) => {
  return axios.put(EmployeeUrl, employee);
}

const deleteEmployee = async (employeeId) => {
  const url = `${EmployeeUrl}/${employeeId}`;
  return axios.delete(url);
}

const UploadPhoto = async (file) => {
  const url = `${EmployeeUrl}/savefile`;
  return axios.post(url, file);
}

export default {
  getDepartmentList,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getEmployeeList,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  UploadPhoto,
  PhotoUrl
};
