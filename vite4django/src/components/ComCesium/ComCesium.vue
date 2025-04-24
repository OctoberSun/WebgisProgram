<template>
  <section id="cesiumContainer">
    <div
      style="
        height: 20px;
        width: 100%;
        position: absolute;
        bottom: 0; /* 定位到底部 */
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        color: white;
      "
      class="fixed-bottom"
    >
      <span style="position: absolute; right: 0">
        经度：<span id="longitude_show"></span> 纬度：<span
          id="latitude_show"
        ></span>
        视角高：<span id="altitude_show"></span>km
      </span>
    </div>
  </section>
</template>

<style scoped>
</style>

<script setup>
import { ref, onMounted } from "vue";
import CesiumStart from "./js/CesiumStart.js";
import "cesium/Build/Cesium/Widgets/widgets.css";
import CesiumImageryLayer from "./js/CesiumImageryLayer.js";
import * as Cesium from "cesium";
import axios, { isCancel, AxiosError } from "axios";
// import { Button } from '@/components/ui/button'
import { useMainStore } from "../../stores/mainstore.js";

let store = useMainStore();
let viewer;
let lat;
let lng;
let result1 = "";
let result2 = "";
let location = ref("Lng: 0, Lat: 0");

onMounted(() => {
  viewer = CesiumStart.begin();
  store.viewer = viewer;

  CesiumImageryLayer.addAutoNaviMap(store.viewer, 2);

  result1 = CesiumImageryLayer.addWMSsvectorlayer(
    viewer,
    "http://localhost:8084/geoserver/argoproject/wms",
    "argoproject:recent_argometa"
  );
  var style;
  if (result1[1]._resource._queryParameters.style == undefined) {
    style = "";
  }

  var loadLayer = {
    url: result1[1]._resource._url,
    layers: result1[1]._resource._queryParameters.layers,
    style: style,
    where: result1[1]._resource._queryParameters.cql_filter,
    imgObj: result1[0],
  };

  //console.log(loadLayer);
  store.loadedLayers.push(loadLayer);

  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    //动态经纬度视角高度
    var longitude_show = document.getElementById("longitude_show");
    var latitude_show = document.getElementById("latitude_show");
    var altitude_show = document.getElementById("altitude_show");
    //具体事件的实现
    var ellipsoid = viewer.scene.globe.ellipsoid;
    //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
    var cartesian = viewer.camera.pickEllipsoid(
      movement.endPosition,
      ellipsoid
    );
    if (cartesian) {
      //将笛卡尔三维坐标转为地图坐标（弧度）
      var cartographic =
        viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
      //将地图坐标（弧度）转为十进制的度数
      var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
      var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
      var alti_String = (
        viewer.camera.positionCartographic.height / 1000
      ).toFixed(2);
      longitude_show.innerHTML = log_String;
      latitude_show.innerHTML = lat_String;
      altitude_show.innerHTML = alti_String;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});
</script>


