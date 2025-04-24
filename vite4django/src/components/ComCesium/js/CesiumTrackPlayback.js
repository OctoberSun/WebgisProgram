
import * as Cesium from 'cesium';
class CesiumTrackPlayback {
    static trackPlayback(viewer, trackData,imgUrl) {
        
    //创建DataSource
    var datasource = new Cesium.CustomDataSource("enetiestestdata");
    viewer.dataSources.add(datasource)
    var lujingdata =trackData;
    
    //添加线
    datasource.entities.add({
        name: "line",
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(lujingdata.flat()),
            material: Cesium.Color.RED,
            width: 1
        }
    })

    var property = new Cesium.SampledPositionProperty();
    var starttime = new Date();
    var stoptime;
    var timestamp = starttime.getTime();

    lujingdata.forEach((pos, index) => {
        var time = new Date(timestamp + index * 5000);
        stoptime = time;
        var position = Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2])
        property.addSample(Cesium.JulianDate.fromDate(time), position);
    })
    property.setInterpolationOptions({
        interpolationDegree: 0.0001,
        interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
    });

    var entitydd = datasource.entities.add({
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: Cesium.JulianDate.fromDate(starttime),
            stop: Cesium.JulianDate.fromDate(new Date(stoptime))
        })]),
        position: property, // 点集
        billboard: {
            image:imgUrl,
            scale: 0.5, //缩放比例
           pixelOffset: new Cesium.Cartesian2(0, -50), //偏移量
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            clampToGround: true  //是否贴地
        },
        path: {
            leadTime: 0,
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.GREEN
            }),
            width: 10
        }
    });

    viewer.clock.currentTime = Cesium.JulianDate.fromDate(starttime); //修改时间轴的当前时间
    viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(stoptime));
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP,
    viewer.clock.shouldAnimate = true; //开始播放
    viewer.zoomTo(datasource)

    }

}export default CesiumTrackPlayback;