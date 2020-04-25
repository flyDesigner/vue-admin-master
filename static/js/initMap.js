import * as esriLoader from "esri-loader";
const options = {
  url: 'http://10.122.3.219/arcgis_js_api/library/4.11/init.js',
};
class initMap {
  /**
   * @param {Array} coordinates 点的坐标
   * @param {String} properties 坐标属性` 
   * @param {String} imgSrc 图片路径
   * @param {Object} layer 图层对象
  */

  //创建图层
  createGraphicsLayer(map, layer) {
    esriLoader.loadModules(["esri/layers/GraphicsLayer"], options).then(([GraphicsLayer]) => {
      layer = new GraphicsLayer({ graphics: [] });
      map.layers.add(layer);
    })
  }
  //创建巡检点 带文本框 
  //创建 点 图标 
  createIcons(map, coordinates, properties, imgSrc, layer, scale, textStr, template) {
    esriLoader.loadModules(["esri/Graphic"], options).then(([Graphic]) => {
      let point = {
        type: "point", // autocasts as new Point()
        longitude: coordinates[0],
        latitude: coordinates[1]
      };
      let picSymbol = {
        type: 'picture-marker',
        url: imgSrc,
        width: scale ? scale : '30px',
        height: scale ? scale : '30px',
      };
      let picGraphic = new Graphic({
        geometry: point,
        symbol: picSymbol,
        attributes: properties,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: '',
          content: ''
        }
      });
      if (properties.reDataType == 'DEPOT') {
        let zoomOutAction = {
          // This text is displayed as a tooltip
          title: "报警已知晓",
          id: "warningKnown",
          image: "./static/mapimg/iocn-danger.png"
        };
        picGraphic.popupTemplate.title = properties.name;
        picGraphic.popupTemplate.content = template;

        let oneClass = ''
        let twoClass = ''
        let threeClass = ''
        let fourClass = ''
        let totalClass = ''

        let esClass = ''
        let etClass = ''
        let ipClass = ''
        let isClass = ''

        let itClass = ''
        let ofClass = ''
        let tfClass = ''
        let hfClass = ''
        let ffClass = ''


        let sClass = ''
        let epClass = ''
        let fClass = ''
        let fmClass = ''
        let psClass = ''
        let osClass = ''
        let jpClass = ''

        let jtClass = ''
        let dpClass = ''
        let dtClass = ''
        let tsClass = ''
        let classArr = []
        if (properties.et !== undefined) {
          if (properties.et === 0) {
            classArr.push(etClass)
          }
        }
        if (properties.one !== undefined) {
          if (properties.one === 0) {
            classArr.push(oneClass)
          }
        }
        if (properties.two !== undefined) {
          if (properties.two === 0) {
            classArr.push(twoClass)
          }
        }
        if (properties.three !== undefined) {
          if (properties.three === 0) {
            classArr.push(threeClass)
          }

        }
        if (properties.four !== undefined) {
          if (properties.four === 0) {
            classArr.push(fourClass)
          }
        }
        if (properties.total !== undefined) {
          if (properties.total === 0) {
            classArr.push(totalClass)
          }
        }

        if (properties.es !== undefined) {
          if (properties.es === 0) {
            classArr.push(esClass)
          }
        }
        if (properties.ip !== undefined) {
          if (properties.ip === 0) {
            classArr.push(ipClass)
          }
        }
        if (properties.is !== undefined) {
          if (properties.is === 0) {
            classArr.push(isClass)
          }
        }
        if (properties.it !== undefined) {
          if (properties.it === 0) {
            classArr.push(itClass)
          }
        }
        if (properties.of !== undefined) {
          if (properties.of === 0) {
            classArr.push(ofClass)
          }
        }
        if (properties.tf !== undefined) {
          if (properties.tf === 0) {
            classArr.push(tfClass)
          }
        }
        if (properties.hf !== undefined) {
          if (properties.hf === 0) {
            classArr.push(hfClass)
          }
        }
        if (properties.ff !== undefined) {
          if (properties.ff === 0) {
            classArr.push(ffClass)
          }
        }
        if (properties.s !== undefined) {
          if (properties.s === 0) {
            classArr.push(sClass)
          }
        }
        if (properties.ep !== undefined) {
          if (properties.s === 0) {
            classArr.push(epClass)
          }
        }
        if (properties.f !== undefined) {
          if (properties.f === 0) {
            classArr.push(fClass)
          }
        }
        if (properties.fm !== undefined) {
          if (properties.fm === 0) {
            classArr.push(fmClass)
          }
        }
        if (properties.ps !== undefined) {
          if (properties.ps === 0) {
            classArr.push(psClass)
          }
        }
        if (properties.os !== undefined) {
          if (properties.os === 0) {
            classArr.push(osClass)
          }
        }
        if (properties.jp !== undefined) {
          if (properties.jp === 0) {
            classArr.push(jpClass)
          }
        }


        if (properties.jt !== undefined) {
          if (properties.jt === 0) {
            classArr.push(jtClass)
          }
        }
        if (properties.dp !== undefined) {
          if (properties.dp === 0) {
            classArr.push(dpClass)
          }
        }
        if (properties.dt !== undefined) {
          if (properties.dt === 0) {
            classArr.push(dtClass)
          }
        }
        if (properties.ts !== undefined) {
          if (properties.ts === 0) {
            classArr.push(tsClass)
          }
        }
        if (classArr.length > 0) {
          picGraphic.popupTemplate.actions = [zoomOutAction];
        }

      }
      if (textStr) {
        let textSymbol = textStr;
        let textGraphic = new Graphic({
          geometry: point,
          symbol: textSymbol,
        });
        layer.graphics.addMany([picGraphic, textGraphic]);
      } else {
        layer.graphics.add(picGraphic);
      }

    })
  }
  //人员轨迹 起止点 创建 点 图标 
  peoLocusqizhiIcons(map, coordinates, properties, imgSrc, layer) {
    //设置图标坐标
    let feature = new ol.Feature({
      geometry: new ol.geom.Point(coordinates),
      properties: properties
    });
    feature.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          src: imgSrc,
          scale: 1
        }) //基础图标对象
      })
    );
    //吧图标加入图层
    layer.getSource().addFeature(feature);
    // this.changeIconScale(map, feature);//sx
  }
  //创建带文本的图标
  createIconAndText(map, coordinates, properties, imgSrc, color, textStr, reDataType, layer, template) {
    esriLoader.loadModules(["esri/Graphic"], options).then(([Graphic]) => {
      let point = {
        type: "point", // autocasts as new Point()
        longitude: coordinates[0],
        latitude: coordinates[1]
      };
      let picSymbol = {
        type: 'picture-marker',
        url: imgSrc,
        width: "40px",
        height: "40px",
      };
      let textSymbol = {
        type: "text",  // autocasts as new TextSymbol()
        color: "green",
        text: textStr,
        xoffset: 0,
        yoffset: -15,
        font: {  // autocasts as new Font()
          size: 8,
          family: "微软雅黑,sans-serif",
          weight: "bold"
        }
      };
      let picGraphic = new Graphic({
        geometry: point,
        symbol: picSymbol,
        attributes: properties,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: textStr,
          content: '<div></div>'
        }
      });
      let textGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol,
      });
      layer.graphics.addMany([picGraphic, textGraphic]);
    })
  }
  //人员轨迹 轨迹点 
  createLocusPoint(map, coordinates, properties, imgSrc, color, textStr, layer) {
    let feature = new ol.Feature({
      geometry: new ol.geom.Point(coordinates),
      properties: properties
    });
    feature.setStyle(this.createPeoLocusPointObject(imgSrc, color, textStr));
    layer.getSource().addFeature(feature);
    // this.changeIconScale(map, feature);//sx
    // this.changeTextScales(map, feature);
    this.peoLocusPointTime(map, feature);
  }
  //人员巡检点 时间 文本位置
  peoLocusPointTime(map, feature) {
    //先初始化尺寸
    let style = feature.getStyle();
    style.getText().setOffsetX(22.0);
    style.getText().setOffsetY(-10.0);
    feature.setStyle(style);
  }
  //人员轨迹上的巡检点 文字 样式
  createPeoLocusPointObject(imgSrc, color, textStr) {
    //创建文本对象样式
    let textStyleObj = new ol.style.Text({
      text: textStr,
      font: "bold 8px 微软雅黑,sans-serif",
      offsetX: 0,
      offsetY: 0,
      fill: new ol.style.Fill({ color }),
      placement: "point",
      backgroundStroke: new ol.style.Stroke({
        color: "#feff2a",
        width: 1
      }),
      backgroundFill: new ol.style.Fill({
        color: "#eef1e7"
      })
      // textAlign: "start"
    });
    return new ol.style.Style({
      image: new ol.style.Icon({ src: imgSrc, scale: 0.7, color: '#ffb403' }),
      text: textStyleObj
    });
  }
  // 人员 轨迹 设置文字根据图层变化大小
  changeTextScales(map, feature) {
    let style = feature.getStyle();
    if (map.getView().getZoom() > 10) {
      style.getText().setScale(map.getView().getZoom() / 12);
      style.getText().setOffsetX(map.getView().getZoom() * 2);
      style.getText().setOffsetY(-map.getView().getZoom());
    } else {
      style.getText().setScale(map.getView().getZoom() / 24);
      style.getText().setOffsetX(map.getView().getZoom());
      style.getText().setOffsetY(-map.getView().getZoom());
    }
    feature.setStyle(style);
    map.getView().on("change:resolution", function () {
      if (this.getZoom() > 10) {
        style.getText().setScale(this.getZoom() / 12);
        style.getText().setOffsetX(this.getZoom() + this.getZoom() / 1.5);
        style.getText().setOffsetY(-this.getZoom());
      } else {
        style.getText().setScale(this.getZoom() / 24);
        style.getText().setOffsetX(this.getZoom());
        style.getText().setOffsetY(-this.getZoom());
      }
      feature.setStyle(style);
    });
  }
  //图片随缩放比放大缩小
  changeIconScale(map, feature) {
    //先初始化尺寸
    let style = feature.getStyle();
    // 重新设置图标的缩放率，基于层级12来做缩放
    //当地图层级越来越往上时（数字变小），图标要变得更小
    if (map.getView().getZoom() > 10) {
      style.getImage().setScale(map.getView().getZoom() / 12);
    } else {
      style.getImage().setScale(map.getView().getZoom() / 24);
    }
    feature.setStyle(style);
    // 监听地图层级变化
    map.getView().on("change:resolution", function () {
      // 重新设置图标的缩放率，基于层级12来做缩放
      //当地图层级越来越往上时（数字变小），图标要变得更小
      if (this.getZoom() > 10) {
        style.getImage().setScale(this.getZoom() / 12);
      } else {
        style.getImage().setScale(this.getZoom() / 24);
      }
      feature.setStyle(style);
    });
  }

  //文字距离图片位置 不随放大缩小改变
  changeTextScaleCancel(map, feature) {
    //先初始化尺寸
    let style = feature.getStyle();
    style.getText().setOffsetX(0.0);
    style.getText().setOffsetY(22.0);
    feature.setStyle(style);
  }
  //文字随缩放比放大缩小
  changeTextScale(map, feature) {
    //先初始化尺寸
    let style = feature.getStyle();
    // 重新设置图标的缩放率，基于层级12来做缩放
    //当地图层级越来越往上时（数字变小），图标要变得更小
    if (map.getView().getZoom() > 10) {
      style.getText().setScale(map.getView().getZoom() / 12);
      style.getText().setOffsetX(0.0);
      style
        .getText()
        .setOffsetY(
          map.getView().getZoom() + map.getView().getZoom() / 1.5
        );
    } else {
      style.getText().setScale(map.getView().getZoom() / 24);
      style.getText().setOffsetX(0.0);
      style.getText().setOffsetY(map.getView().getZoom());
    }
    feature.setStyle(style);
    // 监听地图层级变化
    map.getView().on("change:resolution", function () {
      // 重新设置图标的缩放率，基于层级12来做缩放
      //当地图层级越来越往上时（数字变小），图标要变得更小
      if (this.getZoom() > 10) {
        style.getText().setScale(this.getZoom() / 12);
        style.getText().setOffsetX(0.0);
        style.getText().setOffsetY(this.getZoom() + this.getZoom() / 1.5);
      } else {
        style.getText().setScale(this.getZoom() / 24);
        style.getText().setOffsetX(0.0);
        style.getText().setOffsetY(this.getZoom());
      }
      feature.setStyle(style);
    });
  }
  //创建线的方法
  createLine(coordinates, properties, color, width, layer,template) {
    esriLoader.loadModules(["esri/Graphic", "esri/geometry/Polyline", "esri/geometry/SpatialReference", "esri/symbols/SimpleLineSymbol"], options).then(([Graphic,Polyline,SpatialReference,SimpleLineSymbol]) => {
      let polyline = new Polyline({
        paths: coordinates,
        spatialReference: new SpatialReference(3857)
      });
      let lineSymbol = new SimpleLineSymbol({
        color: color?color:[254,255,42],
        width: 4
      });
      
      let textSymbol = {
        type: "text",  // autocasts as new TextSymbol()
        color: "red",
        text: properties.pointName,
        xoffset: 0,
        yoffset: -15,
        font: {  // autocasts as new Font()
          size: 8,
          family: "微软雅黑,sans-serif",
          weight: "bold"
        }
      };
      let polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: lineSymbol,
        attributes: properties,
        popupTemplate: { // autocasts as new PopupTemplate()
          title: properties.pointName?properties.pointName:'',
          content: template?template:''
        }
      });
      let point = {
        type: "point", // autocasts as new Point()
        longitude: coordinates[0][0],
        latitude: coordinates[0][1]
      };
      let textGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol,
      });
      layer.graphics.addMany([polylineGraphic,textGraphic]);
    })
  }
  //片区 面的方法
  //创建 面  colors, widths,
  createPolygon(coordinates, properties, styleParam, layer) {
    //设置线坐标
    let feature = new ol.Feature(new ol.geom.Polygon([coordinates]));
    let textare = {};
    //fill  stroke  text
    feature.setStyle(
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: styleParam.styleStrokeColor,
          width: 2
        }),
        fill: new ol.style.Fill({
          color: styleParam.styleFillColor
        }),

        text: new ol.style.Text({
          textAlign: "center",
          //文本基线
          textBaseline: "center", //top
          //字体样式
          font: "normal 1.0em 微软雅黑",
          //文本内容
          text: styleParam.areaName,
          //填充样式
          fill: new ol.style.Fill({
            color: "black" //#cc0000 #8484ff
          }),
          placement: "point",
          backgroundStroke: new ol.style.Stroke({
            color: "#feff2a",
            width: 0.2
          }),
          backgroundFill: new ol.style.Fill({
            color: "#eef1e7"
          }),
          //笔触
          borderRadius: '5px',
          //笔触
          stroke: new ol.style.Stroke({
            color: "blue",
            width: 0.5
          })
        })
      })
    );
    layer.getSource().addFeature(feature);
  }
}
export {
  initMap
}