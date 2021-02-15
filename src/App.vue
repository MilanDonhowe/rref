<template>
  <div id="app" class="container">
    <h1 class="title">Matrix Row-Reduction Calculator</h1>
    
    <div id="header" class="container">
        <div class="level field">
          <div class="control">
            <p>Rows:
              <input class="input has-text-centered is-normal" v-model.number="InputRows" type="number">
            </p>
          </div>
          <div class="control level-item">
            <p>Columns:
              <input class="input has-text-centered is-normal" v-model.number="InputCols" type="number">
            </p>
          </div>
        </div>
    
        <Matrix :rows=InputRows :columns=InputCols />
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
import Matrix from "./components/Matrix.vue";

export default {
  name: 'App',
  data(){
    return {
      InputRows: 3,
      InputCols: 3
    }
  },
  components: {
   // HelloWorld,
    Matrix
  }
}

</script>

<style>
#header{
  width:50%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
