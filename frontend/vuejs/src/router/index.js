import Vue from 'vue';
import VueRouter from 'vue-router';
import Department from '../views/Department.vue';
import Employee from '../views/Employee.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/department',
    name: 'Department',
    component: Department
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
