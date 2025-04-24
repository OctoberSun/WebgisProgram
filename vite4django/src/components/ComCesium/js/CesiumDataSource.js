class CesiumDataSource {
    static loadGeoJson(viewer,data,zoomto=false){
        const promise=Cesium.GeoJsonDataSource.load(data);
        promise.then((data)=>{
            viewer.dataSources.add(data);
            if(zoomto) {
                viewer.zoomTo(data)
            }
        })

    }
    static KmlJson(viewer,data,zoomto=false){
        const promise=Cesium.KmlDataSource.load(data);
        promise.then((data)=>{
            viewer.dataSources.add(data);
            if(zoomto) {
                viewer.zoomTo(data)
            }
        })
    }


}
export default CesiumDataSource