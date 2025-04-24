// import 'cesium/Build/Cesium/Widgets/widgets.css';
// 引入 Cesium 命名空间
import * as Cesium from 'cesium';
class CesiumStart {
    static begin(){
        const options ={
            vrButton: true,
            navigationInstructionsInitiallyVisible: false,
            animation: false,  // 禁用动画控件
            baseLayerPicker: false,  // 禁用底图选择控件
            fullscreenButton: false,  // 禁用全屏控件
            geocoder: false,  // 禁用地名搜索控件
            homeButton: false,  // 禁用回到初始视图控件
            vrButton: false, // 隐藏VR按钮，默认false
            infoBox: false,  // 禁用信息框控件
            sceneModePicker: false,  // 禁用场景模式选择控件
            selectionIndicator: false,  // 禁用选中指示器控件
            timeline: false,  // 禁用时间轴控件
            navigationHelpButton: false, // 禁用导航帮助控件
          
            //显示默认高程信息
            terrain: Cesium.Terrain.fromWorldTerrain(),

            // imageryProvider: new Cesium.UrlTemplateImageryProvider({
            //     url: " http://webrd01.is.autonavi.com/appmaptile?&scale=1&lang=zh_cn&style=8&x={x}&y={y}&z={z}", //高德矢量地图
            //
            // })

            // sceneMode: Cesium.SceneMode.SCENE3D,
            // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
            //     url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            // })
        };

        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjOGRjYjQzZi05ODBkLTQ5ZjktYjlhYi1hNmNiMzdkYTkwZDQiLCJpZCI6MTQxMDk5LCJpYXQiOjE2OTg4NTQ2MjZ9.jeSX8TbZ3RmrNygKfoYtoF9P2NIeihU9AGmbthcRngg'
        const viewer = new Cesium.Viewer("cesiumContainer",options);
        // 禁用VR 按钮
      

        viewer.cesiumWidget.creditContainer.style.display = 'none';//去掉cesium的logo

        return viewer;
    }
}

export default CesiumStart;