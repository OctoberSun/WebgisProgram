
import * as Cesium from 'cesium';
class CesiumCamera {
    static customFlyTo(viewer,lon,lat,h=5000){
        const option = {
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, h),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90.0),
                roll: 0.0
            }
        }
        console.log(lon,lat);
        viewer.camera.flyTo(option);
    }
}

export default CesiumCamera