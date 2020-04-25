<template>
  <div style="height:100%">
    <div id="map" style="width:100%; height:100%;"></div>
  </div>
</template>
<script>
import ol from "openlayers";
import "openlayers/dist/ol.css";
import { tileLayer,tileMark,gaodeMapLayer } from "@static/js/baseMap.js";
export default {
  data() {
    return {
        view: new ol.View({
            center: [118.79675388336182,31.97094500303092],
            projection: "EPSG:4326",
            zoom:14,
            maxZoom:18,
            minZoom:5
        }),
        map: {},
        draw: {},
        pointLayer: new ol.layer.Vector({
          source: new ol.source.Vector()
        }),
        gaodeMapLayer: {},
        gaodeMapUrl:
        // 高德地图
        // "http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
        // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
        "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    };
  },
  created() {
    this.$emit("setPageSize", 500);
    this.$emit("setPageTopSize", 123);
    this.$emit("setModalMove");
    this.$emit("setFootShow",false);
    this.$emit("setTitle", 'title');
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.initDraw();
    }); 
  },
  destroyed() {},
  computed: {},
  methods: {
    init() {
      console.log(this.view)
    },
    //初始化地图
    initMap() {
        this.gaodeMapLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: this.gaodeMapUrl,
                format: new ol.format.GeoJSON()
            })
        });
        this.map = new ol.Map({
            // layers: [tileLayer,tileMark],
            layers: [this.gaodeMapLayer],
            view: this.view,
            loadTilesWhileAnimating: true,
            target: "map"
        }); 
        this.map.addLayer(this.pointLayer);
    },
    initDraw() {
      this.draw = new ol.interaction.Draw({
        type: "Point",
        source: this.pointLayer.getSource()
      });
      this.map.addInteraction(this.draw);
      this.draw.on("drawstart", (evt) => {
        this.pointLayer.getSource().clear();
        this.pointLayer.setStyle(
           new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#ffcc33',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#ffcc33'
              })
            })
          })
        );
      })
    }
  }
};
</script>
<style lang="less" >
  .container{
    height: 100%;
    width: 100%;
  }
  // .map{
  //   height: 95%;
  //   width: 90%;
  // }
</style>