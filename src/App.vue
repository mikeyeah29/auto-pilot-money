<template>
  <div id="app">
    
    <FixedNav :active="currentTable" />

    <router-view></router-view>

    <ErrorBox :errors="$store.state.errors" />

    <div class="success" v-if="success">{{ success }}</div>

  </div>
</template>

<script>

import FixedNav from './components/FixedNav.vue';
import ErrorBox from './components/ErrorBox.vue';

import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'App',
  components: {
    FixedNav,
    ErrorBox
  },
  data() {
    return {
      // isAuthenticated: !!localStorage.getItem('token')
      db_table: 'In', // In or Out
      currentTable: 'In'
    }
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  }
}
</script>

<style>

#app {
  padding-bottom: 100px;
}

.icon_btn {
  background: #515ad8;
  color: #fff;
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  padding-top: 4px;
  border-radius: 4px;
}

.bg-red {
  background: #d85151;
}

body {
  padding-top: 60px;
  background: #2c92ff;
}

input {
  padding: 8px 14px;
  border-radius: 5px;
  border: solid 2px #a7a7a7;
}

.h1_box {
  background: #fbba3f;
  width: 100%;
  border-radius: 5px;
  padding: 6px;
  margin-bottom: 10px;
  align-items: center;
}

.h1_box h1 {
  margin: 0px;
  padding: 0px;
  font-size: 18px;
  color: #7d5300;
}

.h1_box svg {
  font-size: 26px;
  color: #7d5300;
}

.flex-1 {
  flex: 1;
}

.no_border {
  border: none;
}

.floating-action-button {
  position: fixed;
  bottom: 15px;
  background: #003266;
  right: 15px;
  border-radius: 100%;
  width: 56px;
  height: 56px;
  text-align: center;
  line-height: 1.35em;
  font-size: 38px;
  color: white;
  z-index: 5;
}

.button {
  border: none;
  padding: 6px 24px;
  background: #e29f3a;
  border-radius: 3px;
  color: #fff;
}

.form-modal {
  display: block;
  background: rgba(0,0,0,0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  padding: 15px;
}

.form-modal .inner {
  background: #fff;
  padding: 45px 15px 15px 15px;
  border-radius: 5px;
  height: auto;
}

.form-modal .action-close {
  line-height: 0.85em;
}

.panel {
  background: #092f5d;
  padding: 15px;
  border-radius: 5px;
  color: #8dc4fb;
}

.panel p {
  margin: 0px;
}

.loading {
  position: relative;
}

.loading:before {
  content: 'loading...';
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background: #2c92ff;
  height: 100%;
  z-index: 3;
  text-align: center;
  color: #fff;
}

.success {
  position: fixed;
  background: #4aff7b;
  width: 100%;
  text-align: center;
  bottom: 0px;
  padding: 16px 0px;
  color: aliceblue;
  color: #077725;
}

</style>
