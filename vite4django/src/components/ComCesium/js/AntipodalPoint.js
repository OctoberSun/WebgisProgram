class AntipodalPoint {

   static resultLon=0;
   static resultLat=0;
   static resultHeight=0;

   // 入口
   static getAntipodalPoint(viewer,lon,lat,height=90000){
       AntipodalPoint.transformation(lon,lat,height);

       AntipodalPoint.flyToAntipodalPoint(viewer,this.resultLon,this.resultLat,height);

       console.log("当前点"+lon,lat+" "+"对趾点"+this.resultLon,this.resultLat)
    }

    // 对趾点转换
    static transformation(lon,lat,height){
       // 转为对趾点
        lat=-lat;
        if(lon<0){
            lon=-(Math.abs(lon)-180);
        }else if(lon>0){
            lon=lon-180;
        }else {
            lon=180;
        }



       AntipodalPoint.resultLon = lon;
       AntipodalPoint.resultLat = lat;

    }

    // 飞到对趾点
    static flyToAntipodalPoint(viewer,lon,lat,height=90000,head=175,pitch=-90){
        const option = {
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, 90000),
            orientation: {
                heading: Cesium.Math.toRadians(head),
                pitch: Cesium.Math.toRadians(pitch),
                roll: 0.0
            }
        }

        viewer.camera.flyTo(option);
    }

}

export default AntipodalPoint;