class CesiumEntity {
  static addPoint(viewer,lng,lat,alt,size=30,zoomTo=true){
      const options={
          name:'Point',
          show:true,
          description:"<h1>落霞与孤鹜齐飞</h1>",
          position:Cesium.Cartesian3.fromDegrees(lng,lat,alt),
          point:{
              pixelSize:size,
              color:Cesium.Color.fromRandom(),
          }
      };
     const entity = viewer.entities.add(options);
     if(zoomTo){
         viewer.zoomTo(entity);
     }
     return viewer.entities.values.length;
  }

    // CesiumEntity.addEllipse(viewer, 121, 31, 0, 1000,500, 45, 'Ellipse Example', true);
    static addEllipse(viewer, centerLog, centerLat, centerAlt, semiMajorAxis, semiMinorAxis,extrudedHeight, rotation, desc = '', material,zoomTo = false) {
        const options = {
            name: 'Ellipse ' + (++viewer.entityCount),
            show: true,
            position: Cesium.Cartesian3.fromDegrees(centerLog, centerLat, centerAlt),
            ellipse: {
                semiMajorAxis: semiMajorAxis,
                semiMinorAxis: semiMinorAxis,
                extrudedHeight:extrudedHeight,
                rotation: Cesium.Math.toRadians(rotation),
                material: material
            }
        };
        const entity = viewer.entities.add(options);
        if (zoomTo) {
            viewer.zoomTo(entity);
        }
        return viewer.entityCount;
    }

    //CesiumEntity.addPolyline(viewer, [121, 31, 10, 121, 31, 0], 'Polyline Example');
    static addPolyline(viewer, positions,width=5, desc = '',material,zoomTo = false) {
        const options = {
            name: 'Polyline ' + (++viewer.entityCount),
            show: true,
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(positions),
                material: material,
                width: width, // 设置线的宽度
            }
        };
        const entity = viewer.entities.add(options);
        if (zoomTo) {
            viewer.zoomTo(entity);
        }
        return viewer.entityCount;
    }
    // CesiumEntity.addWall(viewer, [121, 31.2, 10, 121.6, 31.3, 0, 121.7, 31.2, 0],[1000,500,100],'Wall Example');
    static  addWall(viewer, positions,heightarry, name,material,outline=true) {
        const options = {
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                material: material,
                maximumHeights: heightarry,
                // minimumHeights: [100,100,100],
                outline: outline,
                outlineColor: Cesium.Color.YELLOW,
            },
            name: name,
        };
        var entity = viewer.entities.add(options)
        viewer.zoomTo(entity);
    };

    // CesiumEntity.addBillboard(viewer, 121.001, 31.21, 10,'src/assets/vite.svg', 'Billboard Example', 50);
    static addBillboard(viewer, log, lat, alt, imageUrl, desc = '', pixelSize = 30,material, zoomTo = false) {
        const options = {
            name: 'Billboard ' + (++viewer.entityCount),
            show: true,
            position: Cesium.Cartesian3.fromDegrees(log, lat, alt),
            billboard: {
                image: imageUrl,
                material: material,
                pixelSize: pixelSize
            }
        };
        const entity = viewer.entities.add(options);
        if (zoomTo) {
            viewer.zoomTo(entity);
        }
        return viewer.entityCount;
    }







}
export default CesiumEntity