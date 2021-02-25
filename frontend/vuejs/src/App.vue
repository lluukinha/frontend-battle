<template>
  <div id="app">
    <div class="container text-center mt-3">
      <div class="d-flex flex-column justify-content-center align-items-center mb-3">
        <h3>VueJs Test</h3>
        <h5>Employee Management Portal</h5>
      </div>
      <nav class="navbar navbar-expand-sm bg-light navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              tag="button"
              class="m-1 btn btn-light btn-outline-primary"
              to="/department"
            >
              Department
            </router-link>
            <router-link
              tag="button"
              class="m-1 btn btn-light btn-outline-primary"
              to="/employee"
            >
              Employees
            </router-link>
          </li>
        </ul>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<style>

</style>
