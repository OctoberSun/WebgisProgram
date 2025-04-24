
import * as Cesium from "cesium"
const {Viewer, Camera, Rectangle, Color, FeatureDetection} = Cesium;

class CesiumInit {
    static begin(container = 'cesiumContainer') {
        const options = {
            infoBox: false,
            vrButton: false,
            geocoder: false,
            timeline: false,
            animation: false,
            homeButton: false,
            scene3DOnly: false,
            shouldAnimate: false,
            imageryProvider: true,
            baseLayerPicker: false,
            sceneModePicker: false,
            fullscreenButton: false,
            selectionIndicator: true,
            navigationHelpButton: false,
            sceneMode: Cesium.SceneMode.SCENE3D,
            navigationInstructionsInitiallyVisible: false,
        };

        window.CESIUM_BASE_URL = '../../public/cesium';

        const viewer = new Viewer(container, options);

        // const scene = viewer.scene;
        // scene.fxaa = true;
        // scene.sun.show = false;
        // scene.skyBox.show = false;
        // scene.skyAtmosphere.show = false;
        // scene.pickTranslucentDepth = true;
        // scene.postProcessStages.fxaa.enabled = true;
        // scene.screenSpaceCameraController.enableCollisionDetection = false;
        //
        // const globe = scene.globe;
        // globe.show = true;
        // globe.translucency.enabled = false;
        // globe.depthTestAgainstTerrain = false;
        // globe.baseColor = Color.TRANSPARENT;
        //
        // if (extend) {
        //     viewer.extend(Cesium.viewerDragDropMixin);
        //     viewer.extend(Cesium.viewerPerformanceWatchdogMixin);
        //     viewer.extend(Cesium.viewerCesiumInspectorMixin);
        // }
        //
        // if (FeatureDetection.supportsImageRenderingPixelated()) {
        //     viewer.resolutionScale = window.devicePixelRatio;
        // }
        //
        // const xmin = 119.065117829867;
        // const ymin = 45.8955968828478;
        // const xmax = 119.150342668864;
        // const ymax = 45.9698186561991;
        // Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(xmin, ymin, xmax, ymax);
        // Camera.DEFAULT_VIEW_FACTOR = 0.001;


        return viewer;
    }
}

export {CesiumInit};