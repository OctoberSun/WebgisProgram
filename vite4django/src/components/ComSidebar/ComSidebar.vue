<template>
  <section style="background-color:#17D8E0; width: 20%; height: 90vh">
    <n-tabs type="bar" animated style="padding: 16px 0 0 20px">
      <n-tab-pane name="oasis" tab="加载">
        <n-space>
          <n-checkbox
            v-for="layer in layers"
            :key="layer.label"
            :value="layer.value"
            :label="layer.label"
            :checked="layer.checked"
            @click="
              layer.checked = !layer.checked;
              addLayer(layer.value);
            "
          />
        </n-space>
      </n-tab-pane>

      <n-tab-pane name="the beatles" tab="查询">
        <n-space style="margin: 20px">
          <input
            type="text"
            v-model="inquireInput"
            placeholder="查询浮标信息"
            style="width: 150px;padding: 0;margin: 0;"
          />
          <n-button @click="inquireData">查询</n-button>
        </n-space>
        <n-space  style="margin: 20px">
          <input type="text" style="width: 150px;padding: 0;margin: 0;" placeholder="查找浮标位置" v-model="locateInput" />

          <n-button @click="locateDuoy">查找</n-button>
        </n-space>

        <n-space  style="margin: 20px">
          <input type="text" placeholder="查看轨迹线" style="width: 150px;padding: 0;margin: 0;" v-model="trackInput" />

          <n-button @click="trackLineDuoy">查看</n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="BOA加载">
        加载BOA
        <n-cascader
          v-model:value="value"
          placeholder="选择图层"
          :options="BOALayers"
          clearable="true"
          check-strategy="child"
          @update:value="addBOALayer"
          style="width: 90%;"
        />
      </n-tab-pane>
      <n-tab-pane name="zhao lei" tab="样式">
        <n-space>
          <n-button-group vertical>
            <n-button round value="argometa" @click="selectLayer('argometa')">
              argo元数据
            </n-button>
            <n-button
              ghost
              value="argoheader"
              @click="selectLayer('argoheader')"
            >
              argo核心数据
            </n-button>
            <n-button round value="argometa" @click="selectLayer('argometa')">
              argo活动浮标
            </n-button>
          </n-button-group>

          <n-button-group vertical>
            <n-button round value="argoproject:yandg" @click="changeStyle('argoproject:yandg')">
              样式1
            </n-button>
            <n-button ghost value="point" @click="changeStyle('point')">
              样式2
            </n-button>
            <n-button
              ghost
              value="argoproject:yellow"
              @click="changeStyle('argoproject:yellow')"
            >
              样式3
            </n-button>
            <n-button
              round
              value="argoproject:ygl"
              @click="changeStyle('argoproject:ygl')"
            >
              样式4
            </n-button>
          </n-button-group>
        </n-space>
      </n-tab-pane>
    </n-tabs>

    <n-descriptions
      label-placement="left"
      title="核心数据"
      :column="1"
      v-show="showWho == 'argoheader'"
      style="padding-left: 20px;"
    >
      <n-descriptions-item>
        <template #label> platformnumber </template>
        {{ argoheaderInfo.platformnumber }}
      </n-descriptions-item>

      <n-descriptions-item label="cyclenumber" :value="nr">
        {{ argoheaderInfo.cyclenumber }}
      </n-descriptions-item>

      <n-descriptions-item label="sampledirection">
        {{ argoheaderInfo.sampledirection }}</n-descriptions-item
      >
      <n-descriptions-item label="datamode">
        {{ argoheaderInfo.datamode }}
      </n-descriptions-item>
      <n-descriptions-item label="sampledate">
        {{ argoheaderInfo.sampledate }}
      </n-descriptions-item>

      <n-descriptions-item label="location">
        {{ argoheaderInfo.location }}
      </n-descriptions-item>

      <n-descriptions-item label="dataclass">
        {{ argoheaderInfo.dataclass }}
      </n-descriptions-item>
    </n-descriptions>

    <n-descriptions
      label-placement="left"
      title="元数据"
      :column="1"
      v-show="(showWho == 'argometa') | (showWho == 'recent_argometa')"
      size="100"
      style="padding-left: 20px;"
    >
      <n-descriptions-item>
        <template #label> platformnumber </template>

        {{ argometaInfo.platformnumber }}
      </n-descriptions-item>

      <n-descriptions-item label="transmissionsystem" :value="nr">
        {{ argometaInfo.transmissionsystem }}
      </n-descriptions-item>

      <n-descriptions-item label="platformmodel">
        {{ argometaInfo.platformmodel }}</n-descriptions-item
      >
      <n-descriptions-item label="platformmaker">
        {{ argometaInfo.platformmaker }}
      </n-descriptions-item>
      <n-descriptions-item label="floatserialnumber">
        {{ argometaInfo.floatserialnumber }}
      </n-descriptions-item>

      <n-descriptions-item label="wmoinstrumenttype">
        {{ argometaInfo.wmoinstrumenttype }}
      </n-descriptions-item>

      <n-descriptions-item label="projectname">
        {{ argometaInfo.projectname }}
      </n-descriptions-item>

      <n-descriptions-item label="datacenter">
        {{ argometaInfo.datacenter }}
      </n-descriptions-item>

      <n-descriptions-item label="piname">
        {{ argometaInfo.piname }}
      </n-descriptions-item>

      <n-descriptions-item label="startupdateoffloat">
        {{ argometaInfo.startupdateoffloat }}
      </n-descriptions-item>
      <n-descriptions-item label="launchdate">
        {{ argometaInfo.launchdate }}
      </n-descriptions-item>
      <n-descriptions-item label="location">
        {{ argometaInfo.location }}
      </n-descriptions-item>
      <n-descriptions-item label="cycletime">
        {{ argometaInfo.cycletime }}
      </n-descriptions-item>

      <n-descriptions-item label="parkpressure">
        {{ argometaInfo.parkpressure }}
      </n-descriptions-item>
      <n-descriptions-item label="profilepressure">
        {{ argometaInfo.profilepressure }}
      </n-descriptions-item>
    </n-descriptions>
  </section>
</template>

<script >
import { useMainStore } from "../../stores/mainstore.js";

import * as Cesium from "cesium";
import CesiumImageryLayer from "../../components/ComCesium/js/CesiumImageryLayer.js";
import { ref, onMounted } from "vue";
import GetData from "../../js/GetData.js";
import CesiumCamera from "../ComCesium/js/CesiumCamera.js";
import CesiumTrackPlayback from "../ComCesium/js/CesiumTrackPlayback.js";
export default {
  data() {
    return {
      inquireCode: 2,
      fieldItem: "",
      store: useMainStore(),
      selectedLayer: "",
      layers: [
        {
          label: "Argo核心数据",
          value: "argoproject:argoheader",
          checked: false,
        },
        { label: "Argo元数据", value: "argoproject:argometa", checked: false },
        {
          label: "Argo活动浮标",
          value: "argoproject:recent_argometa",
          checked: true,
        },
      ],
      BOALayers: [
        {
          value: "2004",
          label: "2004",
          children: [
            {
              value: "01",
              label: "01",
              children: [
                {
                  value: "200401temp",
                  label: "temp",
                },
                {
                  value: "200401salt",
                  label: "salt",
                },
                {
                  value: "200401MLD",
                  label: "MLD",
                },
                {
                  value: "200401ILD",
                  label: "ILD",
                },
                {
                  value: "200401CMLD",
                  label: "CMLD",
                },
              ],
            },
          ],
        },
        {
          value: "2014",
          label: "2014",
          children: [
            {
              value: "03",
              label: "03",
              children: [
                {
                  value: "201403temp",
                  label: "temp",
                },
                {
                  value: "201403salt",
                  label: "salt",
                },
                {
                  value: "201403MLD",
                  label: "MLD",
                },
                {
                  value: "201403ILD",
                  label: "ILD",
                },
                {
                  value: "201403CMLD",
                  label: "CMLD",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  setup() {
    const showWho = ref("Neither");
    const argoheaderInfo = ref({ a: 1, b: 2 });

    const argometaInfo = ref({ a: 1, b: 2 });
    // 创建一个响应式变量

    const inquireInput = ref("");
    const locateInput = ref("");
    const trackInput = ref("");
    // 定义一个函数来处理输入框的值

    // 定义一个函数来使用输入框的值

    onMounted(() => {
      // pickLayerFeature();
     // console.log("mounted");
      const store = useMainStore(); // 获取 Vuex store 实例
      var handler = new Cesium.ScreenSpaceEventHandler(store.viewer.canvas);
      handler.setInputAction(async function (event) {
        store.viewer.selectedEntity = undefined;
        var pickRay = store.viewer.camera.getPickRay(event.position);
        var featuresPromise =
          await store.viewer.imageryLayers.pickImageryLayerFeatures(
            pickRay,
            store.viewer.scene
          );
        // console.log("featuresPromise:", featuresPromise)
        // console.log( featuresPromise[0].data.id)
        // 以.切片
        try {
          var layerName = featuresPromise[0].data.id.split(".")[0];
        } catch (error) {
          showWho.value = 'Neither';
          return;
        }

        if ((layerName === "recent_argometa") | (layerName === "argometa")) {
          console.log(layerName);
          showWho.value = layerName;

          argometaInfo.value.platformnumber =
            featuresPromise[0].data.properties.platformnumber;
          argometaInfo.value.transmissionsystem =
            featuresPromise[0].data.properties.transmissionsystem;
          argometaInfo.value.platformmodel =
            featuresPromise[0].data.properties.platformmodel;
          argometaInfo.value.platformmaker =
            featuresPromise[0].data.properties.platformmaker;
          argometaInfo.value.floatserialnumber =
            featuresPromise[0].data.properties.floatserialnumber;

          argometaInfo.value.location =
            featuresPromise[0].data.properties.launchlon +
            "," +
            featuresPromise[0].data.properties.launchlat;
          argometaInfo.value.wmoinstrumenttype =
            featuresPromise[0].data.properties.wmoinstrumenttype;

          argometaInfo.value.projectname =
            featuresPromise[0].data.properties.projectname;
          argometaInfo.value.projectname =
            featuresPromise[0].data.properties.projectname;
          argometaInfo.value.datacenter =
            featuresPromise[0].data.properties.datacenter;
          argometaInfo.value.piname = featuresPromise[0].data.properties.piname;

          argometaInfo.value.startupdateoffloat =
            featuresPromise[0].data.properties.startupdateoffloat;
          argometaInfo.value.launchdate =
            featuresPromise[0].data.properties.launchdate;
          argometaInfo.value.parkpressure =
            featuresPromise[0].data.properties.parkpressure;

          argometaInfo.value.cycletime =
            featuresPromise[0].data.properties.cycletime;
          argometaInfo.value.profilepressure =
            featuresPromise[0].data.properties.profilepressure;
        } else if (layerName == "argoheader") {
          console.log(layerName);

          showWho.value = layerName;
          argoheaderInfo.value.platformnumber =
            featuresPromise[0].data.properties.platformnumber;
          argoheaderInfo.value.cyclenumber =
            featuresPromise[0].data.properties.cyclenumber;
          argoheaderInfo.value.sampledirection =
            featuresPromise[0].data.properties.sampledirection;
          argoheaderInfo.value.datamode =
            featuresPromise[0].data.properties.datamode;
          argoheaderInfo.value.sampledate =
            featuresPromise[0].data.properties.sampledate;
          argoheaderInfo.value.location =
            featuresPromise[0].data.properties.longitude +
            "," +
            featuresPromise[0].data.properties.latitude;
          argoheaderInfo.value.dataclass =
            featuresPromise[0].data.properties.dataclass;
        }else{
          
          showWho.value = 'Neither';
        }

        console.log(featuresPromise[0].data.properties);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    });

    return {
      showWho,
      argoheaderInfo,
      argometaInfo,
      inquireInput,
      locateInput,
      trackInput,
      addBOALayer(value) {
        console.log(value);
        const store = useMainStore();
        CesiumImageryLayer.addWMSsvectorlayer(
          store.viewer,
          "http://localhost:8084/geoserver/argoproject/wms",
          value
        );
      },

      async inquireData() {
        //
        console.log(inquireInput.value);
        let result = await GetData.getPartFeature(inquireInput.value);
        console.log(result);
        showWho.value = "argometa";

        argometaInfo.value.platformnumber = result.platformnumber;
        argometaInfo.value.transmissionsystem = result.transmissionsystem;
        argometaInfo.value.platformmodel = result.platformmodel;
        argometaInfo.value.platformmaker = result.platformmaker;
        argometaInfo.value.floatserialnumber = result.floatserialnumber;

        argometaInfo.value.location = result.launchlon + "," + result.launchlat;
        argometaInfo.value.wmoinstrumenttype = result.wmoinstrumenttype;

        argometaInfo.value.projectname = result.projectname;
        argometaInfo.value.projectname = result.projectname;
        argometaInfo.value.datacenter = result.datacenter;
        argometaInfo.value.piname = result.piname;

        argometaInfo.value.startupdateoffloat = result.startupdateoffloat;
        argometaInfo.value.launchdate = result.launchdate;
        argometaInfo.value.parkpressure = result.parkpressure;

        argometaInfo.value.cycletime = result.cycletime;
        argometaInfo.value.profilepressure = result.profilepressure;
      },
      async locateDuoy() {
        let store = useMainStore();
        // console.log(value);
        //
        let result = await GetData.getPartFeatureLocation(locateInput.value);
        console.log(result);
        CesiumCamera.customFlyTo(store.viewer, result[1], result[0], 25000);
      },
      async trackLineDuoy() {
        let store = useMainStore();
        let result = await GetData.getPartFeatureLocus(trackInput.value);
        console.log(trackInput.value);
        console.log(result);
        CesiumTrackPlayback.trackPlayback(store.viewer, result,'img/浮标站.png')
      },
    };
  },

  methods: {
    selectLayer(layers) {
      this.selectedLayer = layers;
    },
    changeStyle(style) {
      var layer = this.selectedLayer;
      console.log(this.selectedLayer);
      console.log(style);

      const layerIndex = this.store.loadedLayers.findIndex((item) => {
        return item.layers === layer;
      });

      if (layerIndex !== -1) {
        // 图层已加载，移除图层
        console.log("yc");
        const itemToRemove = this.store.loadedLayers[layerIndex];
        this.store.loadedLayers.splice(layerIndex, 1);
        this.store.viewer.imageryLayers.remove(itemToRemove.imgObj);
        // return{ checked: true };
      } else {
        // 图层未加载，添加图层
        console.log("add");
        var result = CesiumImageryLayer.addWMSsvectorlayer(
          this.store.viewer,
          "http://localhost:8084/geoserver/argoproject/wms",
          layer,
          style
        );

        var loadLayer = {
          url: result[1]._resource._url,
          layers: result[1]._resource._queryParameters.layers,
          style: style,
          where: result[1]._resource._queryParameters.cql_filter,
          imgObj: result[0],
        };

        // 添加图层到列表中
        this.store.loadedLayers.push(loadLayer);
      }
    },
    addLayer(layer) {
      //遍历this.store.loadedLayers列表，如layer在其中，则不加载
      // 遍历

      const layerIndex = this.store.loadedLayers.findIndex((item) => {
        return item.layers === layer;
      });

      if (layerIndex !== -1) {
        // 图层已加载，移除图层
        console.log("yc");
        const itemToRemove = this.store.loadedLayers[layerIndex];
        this.store.loadedLayers.splice(layerIndex, 1);
        this.store.viewer.imageryLayers.remove(itemToRemove.imgObj);
        // return{ checked: true };
      } else {
        // 图层未加载，添加图层
        console.log("add");
        var result = CesiumImageryLayer.addWMSsvectorlayer(
          this.store.viewer,
          "http://localhost:8084/geoserver/argoproject/wms",
          layer
        );
        var style;
        if (result[1]._resource._queryParameters.style == undefined) {
          style = "";
        }

        var loadLayer = {
          url: result[1]._resource._url,
          layers: result[1]._resource._queryParameters.layers,
          style: style,
          where: result[1]._resource._queryParameters.cql_filter,
          imgObj: result[0],
        };

        // 添加图层到列表中
        this.store.loadedLayers.push(loadLayer);
      }
     // console.log(this.store.loadedLayers);
    },
    changeLabel() {
      console.log("changeLabel");
      this.nr = "早餐1"; // 通过this访问响应式属性
    },
  },
};
</script>

<style>
</style>