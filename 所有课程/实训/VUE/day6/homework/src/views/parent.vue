<template>
  <div id="parent">
    <nav>
      <router-link to="/parent/son1">son1</router-link>
      <router-link to="/parent/son2">son2</router-link>
    </nav>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParentCom'
}
</script>
<style lang="scss">
#parent {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  height:100%;
  width:100%;

  display: grid;
  grid:
  "aside content" 1fr/
  3fr 7fr;
}

nav {
  margin: 0 !important;
  grid-area: aside;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 3em;

  //float: left;
  width: 100%;
  height: 100%;
  text-indent: 2em;
  line-height: calc(1em * 3);
  background-color: #42b983aa;
}

#container {
  grid-area: content;

  //border: red solid 1px;
  //grid-area: content;

  background-color: #cccc00aa;
  //float: left;
  width: 100%;
  height: 100%;

}
</style>
