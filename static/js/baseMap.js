// 所有地图的基础图层
import ol from "openlayers";

const key = "50a00af72e2c650b0fecfbeee42edd0e";
const gaodeMapUrl =
    // 高德地图
    // "http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    // "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
    // 谷歌地图
    // "http://mt1.google.cn/vt?lyrs=m&hl=zh-CN&gl=CN&style=47&x={x}&y={y}&z={z}";





// 封装底图函数
function getBaseLayer(layername, layer) {
    return new ol.layer.Tile({
        title: layername,
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=" + layer + "&x={x}&y={y}&l={z}&tk=" + key
        })
    });
}
//封装标注图层
function getAnnoLayer(layername, layer) {
    return new ol.layer.Tile({
        title: layername,
        source: new ol.source.XYZ({
            url: "http://t4.tianditu.com/DataServer?T=" + layer + "&x={x}&y={y}&l={z}&tk=" + key
        })
    });
}

// 天地图底图
var tileLayer = getBaseLayer("天地图路网", "vec_w");
//标注图层
var tileMark = getAnnoLayer("地图标注", "cva_w");
var imgLayer = getBaseLayer("天地图影像地图", "img_w");
var terLayer = getBaseLayer("天地图地形地图", "ter_w");

// 高德、谷歌地图底图
var gaodeMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: gaodeMapUrl,
        format: new ol.format.GeoJSON()
    })
});

export {
    tileLayer,
    tileMark,
    imgLayer,
    terLayer,
    gaodeMapLayer
}