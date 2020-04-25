<template>
  <div class="container">
    <div id="map" class="baseMap"></div>
  </div>
</template>
<script>
import * as esriLoader from "esri-loader";
import { initMap } from "@static/js/initMap.js";
export default {
  data() {
    return {
      view: {},
      map: {},
      mapCenter: [119.452753, 32.204402],
      gaodeMapLayer: {},
      methodMap: {},
      gaodeMapUrl:
        // 高德地图
        // "http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
        // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
        "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    };
  },
  created() {
    this.methodMap = new initMap();
    this.init();
    this.initMaps();
  },
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {
    init() {
      console.log(this.methodMap);
    },
    //初始化地图
    initMaps() {
      this.map = {};
      this.view = {};
      const options = $store.state.ServiceUrl;
      esriLoader
        .loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/TileLayer",
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polyline",
            "esri/geometry/Point",
            "esri/symbols/SimpleLineSymbol",
            "dojo/on",
            "dojo/dom",
            "dojo/domReady!"
          ],
          options
        )
        .then(
          ([
            Map,
            MapView,
            MapImageLayer,
            TileLayer,
            GraphicsLayer,
            Graphic,
            Polyline,
            Point,
            SimpleLineSymbol,
            on,
            dom
          ]) => {
            this.map = new Map({
              basemap: "streets"
            });

            this.view = new MapView({
              container: "map",
              map: this.map,
              center: this.mapCenter,
              extent: {
                // autocasts as new Extent()
                xmin: 1.3270493576311111e7,
                ymin: 3767972.238643886,
                xmax: 1.3339073713471387e7,
                ymax: 3805675.4390502865,
                spatialReference: 3857
              },
              zoom: 12
            });
          }
        )
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" >
.container {
  height: 100%;
  width: 100%;
}
.baseMap {
  height: 95%;
  width: 90%;
}
</style>