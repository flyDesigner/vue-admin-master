<template>
  <div>
    <iframe src="static/html/text1.html"  style="height:100px;width:300px;" id="richedit" frameborder="0"></iframe>
    <ul id="myMenu" style="position:absolute;visibility:hidden;background-color:silver">
      <li>
        <a href="http://www.nczonline.net">Nicholas’ site</a>
      </li>
      <li>
        <a href="http://www.wrox.com">Wrox site</a>
      </li>
      <li>
        <a href="http://www.yahoo.com">Yahoo!</a>
      </li>
    </ul>
    <div id="myBtn" style="width:200px;height:100px;background-color:red" @click="ssss"></div>
    <div class="container" @mouseenter="getTile($event)">
      <div class="container-in" ></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 在原生document对象中创建原生事件并给原生dom对象绑定上事件
    var btn = document.getElementById("myBtn");
    //创建事件对象
    var event = document.createEvent("MouseEvents");
    //初始化事件对象
    event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0,
    false, false, false, false, 0, null);
    //触发事件
    btn.dispatchEvent(event);
  },
  destroyed() {},
  computed: {},
  methods: {
    getTile(event) {
      // console.log(event);
    },
    ssss(event) {
      console.log(event);
    },
    getRigthMenu(event) {
      console.log(event)
      var menu = document.getElementById("myMenu");
      menu.style.left = event.clientX + "px";
      menu.style.top = event.clientY + "px";
      menu.style.visibility = "visible";
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.container {
  width: 400px;
  height: 300px;
  background-color: aqua;
}
.container-in {
  width: 200px;
  height: 150px;
  background-color: blue;
  margin: 0 auto;
}
</style>