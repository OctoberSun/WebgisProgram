// import * as Cesium from 'cesium';
// import * as Cesium from "./Cesium/Cesium.js";
import {Cesium3DTileset} from "cesium";

import * as Cesium from 'cesium';
// import "../../../public/test3dtiles/tileset.json"

class CesiumImageryLayer {
    static addMapBoxLayer(viewer, style = 0) {

        const accessToken = 'pk.eyJ1Ijoid2ViZ2lzNGRlbHBoaSIsImEiOiJjbGt3OW81' +
            'angweG5sM3FwbXo2aDdlYWhuIn0.bgGUFYPoBCrMCuR25yqLBA';
        var styleId = "";
        switch (style) {
            case 0:
                styleId = "streets-v12"
                break;
            case 1:
                styleId = "outdoors-v12"
                break;
            case 2:
                styleId = "light-v11"
                break;
            case 3:
                styleId = "dark-v11"
                break;
            case 4:
                styleId = "satellite-v9"
                break;
            case 5:
                styleId = "satellite-streets-v12"
                break;
            case 6:
                styleId = "navigation-day-v1"
                break;
            case 7:
                styleId = "navigation-night-v1"
                break;
            default:
                alert("选择错误");
        }

        const layer = new Cesium.MapboxStyleImageryProvider({
            styleId: styleId,
            accessToken: accessToken
        });

        const imageryLayers = viewer.imageryLayers;
        imageryLayers.addImageryProvider(layer);
        return imageryLayers.length;

    }

    static addOpenStreetMapLayer(viewer, url = '0', showcredit = false) {
        switch (url) {
            case '0':
                url = 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png';
                break;
            case '1':
                url = 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
                break;
            case '2':
                url = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
                break;
            case '3':
                url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
                break;
            default:
        }
        const options = {
            url: url,
            subdomains: ['a', 'b', 'c', 'd',],
            credit: new Cesium.Credit('OSM', showcredit),
        };
        const layer = new Cesium.UrlTemplateImageryProvider(options);
        const imageryLayers = viewer.imageryLayers;
        imageryLayers.addImageryProvider(layer);
        return imageryLayers.length;
    }

    static async add3DTiles(viewer, url = './src/assets/test3dtiles/tileset.json') {
        // url='/assets/dataHotel/Tileset.json'
        const tileset = await Cesium.Cesium3DTileset.fromUrl(url);
        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset)
        // return viewer;
    }


    static addModel(viewer, lng, lat, alt, url, scale = 1, zoomto = true) {
        const options = {
            position: Cesium.Cartesian3.fromDegrees(lng, lat, alt),
            model: {
                show: true,
                url: url,
                scale: scale,
            }
        };
        const entity = viewer.entities.add(options);
        if (zoomto) {
            viewer.zoomTo(entity);
        }
        return viewer.entities.length;
    }


    static loadTianditu(viewer, type, mark = true) {
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        const key = "cd3496a4a132a52048c940bfa407cbb5"
        var typeArry = type.split(",");
        var layerType = typeArry[0];
        var noteType = typeArry[1];
        // 创建天地图图像提供者实例
        // 加载地图图层
        const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: `http://t0.tianditu.gov.cn/${layerType}_w/wmts?tk` + '=' + key,
            layer: layerType,
            style: "default",
            tileMatrixSetID: "w",
            format: "tiles",
            maximumLevel: 18,
        });
        viewer.imageryLayers.addImageryProvider(imageryProvider);


        console.log(imageryProvider._resource._url)
        // 加载标注图层
        if (mark) {
            const imageryProvider1 = new Cesium.WebMapTileServiceImageryProvider({
                url: `http://t0.tianditu.gov.cn/${noteType}_w/wmts?tk` + '=' + key,
                layer: noteType,
                style: "default",
                tileMatrixSetID: "w",
                format: "tiles",
                maximumLevel: 18,
            });
            viewer.imageryLayers.addImageryProvider(imageryProvider1);
        }
        return viewer.imageryLayers.length;
    }

    static addTencentMaps(viewer) {
        const options = {
            url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400",
            customTags: {
                sx: function (imageryProvider, x, y, level) {
                    return x >> 4;
                },
                sy: function (imageryProvider, x, y, level) {
                    return ((1 << level) - y) >> 4
                }
            }
        };
        const layer = new Cesium.UrlTemplateImageryProvider(options);
        viewer.imageryLayers.addImageryProvider(layer);
        return viewer.imageryLayers.length;
        // return viewer
    }

    static addAutoNaviMap(viewer, type = 2) {

        let url = "";
        switch (type) {
            case 1:
                url = "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
                break;
            case 2:
                url = "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
                break;
            default:
                alert("你好，我是一个警告框！")

        }

        const options = {
            url: url,
            layer: "tdtAnnoLayer",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible"
        };
        const layer = new Cesium.UrlTemplateImageryProvider(options);
        viewer.imageryLayers.addImageryProvider(layer);
        return viewer.imageryLayers.length;
        // return viewer
    }

    static loadArcGISbyUrl(viewer, type = 1) {
        var url = "";
        switch (type) {
            case 1:
                url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';
                break;
            case 2:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer";
                break;
            case 3:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer";
                break;
            case 4:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer";
                break;
            case 5:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer";
                break;
            case 6:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/18";
                break;
            case 7:
                url = "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer";
                break;
            case 8:
                url = "https://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer";
                break;
            case 9:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
                break;
            case 10:
                url = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
                break;
        }
        const options = {
            url: url,
            layer: 'World_Imagery',
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'GoogleMapsCompatible',
            maximumLevel: 19,
            credit: new Cesium.Credit('© Esri', 'https://www.esri.com/')
        };
        const layer = new Cesium.WebMapTileServiceImageryProvider(options);
        viewer.imageryLayers.addImageryProvider(layer);
        return viewer.imageryLayers.length;
        // return viewer
    }

    static addWMTS(viewer, layers = "argoproject:province_UTM", url = "http://127.0.0.1:8080/geoserver/gwc/service/wmts") {
        // 教程https://blog.csdn.net/m0_48524977/article/details/126527469
        var wmtsImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: url,
            layer: layers, //图层名称，如：nurc:Img_Sample topp:states 'tasmania' nurc:mosaic ne:coastlines    ne:boundary_lines ne:populated_places    ne:world ne:countries  nurc:Arc_Sample argoproject:world_8km
            style: '',
            format: 'image/png',
            tileMatrixSetID: 'EPSG:4326',
            tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'],
            tilingScheme: new Cesium.GeographicTilingScheme(),
        });
        viewer.imageryLayers.addImageryProvider(wmtsImageryProvider)
        // viewer.imageryLayers.addImageryProvider(shadedRelief1);
    }


    static addWMSsvectorlayer(viewer, url, layers,styles = '', where = '1=1') {
        const options = {
            "url": url,
            "layers": layers,
            "parameters": {
                "service": 'WMS',
                "version": '1.3.0',
                "format": 'image/png',
                "transparent": true,
                "styles": styles,
                "cql_filter": where,
            }
        };
        const provider = new Cesium.WebMapServiceImageryProvider(options);
        let result = viewer.imageryLayers.addImageryProvider(provider);
        return [result,provider];
    }

    static addWMSLayers(viewer, layers, workspace="",url = "http://localhost:8080/geoserver/") {
        const provider =
            new Cesium.WebMapServiceImageryProvider({
                url: url+workspace+"/wms",
                layers:workspace+":"+layers,
                parameters: {
                    service: 'WMS',
                    version: '1.3.0',
                    format: 'image/png',
                    transparent: true,

                },
            });
        const imageryLayer = new Cesium.ImageryLayer(provider);
        viewer.imageryLayers.add(imageryLayer);
    }

    static async addArcGisMapServerImagery(viewer, type = 1) {
        var url = "";
        switch (type) {
            case 1:
                url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';
                break;
            case 2:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer";
                break;
            case 3:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer";
                break;
            case 4:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer";
                break;
            case 5:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer";
                break;
            case 6:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/18";
                break;
            case 7:
                url = "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer";
                break;
            case 8:
                url = "https://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer";
                break;
            case 9:
                url = "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
                break;
            case 10:
                url = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
                break;
        }
        const layer = await Cesium.ArcGisMapServerImageryProvider.fromUrl(url);
        viewer.imageryLayers.addImageryProvider(layer);
        return viewer.imageryLayers.length;
    }

    // static loadArcGISbyUrl(viewer, url = '0', picked = false, showcredit = false) {
    //     switch (url) {
    //         case '0':
    //             url = 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer';
    //             break;
    //         case '1':
    //             url = 'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer';
    //             break;
    //         case '2':
    //             url = 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer';
    //             break;
    //         case '3':
    //             url = 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer';
    //             break;
    //         case '4':
    //             url = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
    //             break;
    //     }
    //     const options = {
    //         enablePickFeatures: picked,
    //         credit: new Cesium.Credit('ArcGIS', showcredit),
    //     };
    //     const provider = Cesium.ArcGisMapServerImageryProvider.fromUrl(url, options);
    //     const layer = Cesium.ImageryLayer.fromProviderAsync(provider);
    //     const imageryLayers = viewer.imageryLayers;
    //     imageryLayers.add(layer);
    //     return imageryLayers.length;
    // }

    // static loadArcGISbyUrl_2(viewer, type = 1) {
    //     var url = "";
    //     switch (type) {
    //         case 1:
    //             url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';
    //             break;
    //         case 2:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer";
    //             break;
    //         case 3:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer";
    //             break;
    //         case 4:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer";
    //             break;
    //         case 5:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer";
    //             break;
    //         case 6:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/18";
    //             break;
    //         case 7:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer";
    //             break;
    //         case 8:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer";
    //             break;
    //         case 9:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
    //             break;
    //         case 10:
    //             url = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
    //             break;
    //     }
    //     const options = {
    //         url: url,
    //         layer: 'World_Imagery',
    //         style: 'default',
    //         format: 'image/jpeg',
    //         tileMatrixSetID: 'GoogleMapsCompatible',
    //         maximumLevel: 19,
    //         credit: new Cesium.Credit('© Esri', 'https://www.esri.com/')
    //     };
    //     const layer = new Cesium.WebMapTileServiceImageryProvider(options);
    //     viewer.imageryLayers.addImageryProvider(layer);
    //     return viewer.imageryLayers.length;
    // }


    // k
    // static loadArcGISbyUrl(viewer, type = 1) {
    //     var url = "";
    //     switch (type) {
    //         case 1:
    //             url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';
    //             break;
    //         case 2:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer";
    //             break;
    //         case 3:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer";
    //             break;
    //         case 4:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer";
    //             break;
    //         case 5:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer";
    //             break;
    //         case 6:
    //             url = "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/18";
    //             break;
    //     }
    //     const options = {
    //         url: url,
    //         layer: 'World_Imagery',
    //         style: 'default',
    //         format: 'image/jpeg',
    //         tileMatrixSetID: 'GoogleMapsCompatible',
    //         maximumLevel: 19,
    //         credit: new Cesium.Credit('© Esri', 'https://www.esri.com/')
    //     };
    //     const layer = new Cesium.WebMapTileServiceImageryProvider(options);
    //     viewer.imageryLayers.addImageryProvider(layer);
    //     return viewer.imageryLayers.length;
    // }


    // k
    static loadTianditu11(viewer) {
        var maplayerType = [
            "vec",
            "img",
            "ter"
        ];
        var marklayerType = [
            "cva",
            "cia",
            "cta"
        ];
        var mapType = [
            'http://t0.tianditu.gov.cn/vec_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5',
            'http://t0.tianditu.gov.cn/img_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5',
            'http://t0.tianditu.gov.cn/ter_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5',
        ];
        var markType = [
            'http://t0.tianditu.gov.cn/cva_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5',
            'http://t0.tianditu.gov.cn/cia_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5',
            'http://t0.tianditu.gov.cn/cta_w/wmts?tk=cd3496a4a132a52048c940bfa407cbb5'
        ];
        // 地图图层
        const imageryProvider_map = new Cesium.WebMapTileServiceImageryProvider({
            url: mapType[1],
            layer: maplayerType[1],
            style: "default",
            tileMatrixSetID: "w",
            format: "tiles",
            maximumLevel: 18,
        });
        const imageryProvider_marker = new Cesium.WebMapTileServiceImageryProvider({
            url: mapType[0],
            layer: maplayerType[0],
            style: "default",
            tileMatrixSetID: "w",
            format: "tiles",
            maximumLevel: 18,
        });
        viewer.imageryLayers.addImageryProvider(imageryProvider_map);
        viewer.imageryLayers.addImageryProvider(imageryProvider_marker);
        return viewer.imageryLayers.length;
    }


    static addomslayer(viewer, url = 'https://a.tile.openstreetmap.org/') {
        const provider = new Cesium.OpenStreetMapImageryProvider({
            "url": url,
            "credit": new Cesium.Credit(url, showcredit),
        });
        const layer = Cesium.ImageryLayer.fromProviderAsync(provider);
        viewer.imageryLayers.add(layer);
        return viewer.imageryLayers.length;
    }



    static layers=[];
    static loadGoogleMap(viewer, lyrs = ``) {
        const url = `https://gac-geo.googlecnapps.cn/maps/vt?x={x}&y={y}&z={z}&lyrs=${lyrs}`;
        const options = {
            "url": url,
        };
        const provider = new Cesium.UrlTemplateImageryProvider(options);
        const layer = Cesium.ImageryLayer.fromProviderAsync(provider);


        var layerObject={
            url:options.url,
            index:viewer.imageryLayers.length
        }

       var result =  CesiumImageryLayer.layerJudgment(layerObject)

        if(result==false){
            viewer.imageryLayers.add(layer);
        }

        return viewer.imageryLayers.length;
    }

    static layerJudgment(layerObject){
        if(this.layers.length==0){
            this.layers.push(layerObject)
            return false
        }
        for(var lyr in this.layers){
            if(this.layers[lyr].url == layerObject.url){
                // 根据该图层索引，将其抬升到最上层
                CesiumImageryLayer.bringLayerToTop(this.layers[lyr].index)

                // 抬升该图层后，更新该图层的索引属性（index）
                var nowLyrIndex = viewer.imageryLayers.length-1
                this.layers[lyr].index = nowLyrIndex;

                return true
            }else{
                this.layers.push(layerObject)
                return false
            }

        }
    }


    // static layers = [];
    // static loadGoogleMap(viewer, lyrs = ``) {
    //     const url = `https://gac-geo.googlecnapps.cn/maps/vt?x={x}&y={y}&z={z}&lyrs=${lyrs}`;
    //     const options = {
    //         "url": url,
    //     };
    //     const provider = new Cesium.UrlTemplateImageryProvider(options);
    //     const layer = Cesium.ImageryLayer.fromProviderAsync(provider);
    //
    //     var layerObject = {
    //         url: options.url,
    //         index: viewer.imageryLayers.length
    //     }
    //
    //     if (this.layers.length == 0) {
    //         // 数组为空
    //         this.layers.push(layerObject)
    //
    //         viewer.imageryLayers.add(layer);
    //     }
    //     for (var lyr in this.layers) {
    //         if (this.layers[lyr].url == layerObject.url) {
    //
    //             //将该图层索引抬升到最上层
    //             var layers = viewer.scene.imageryLayers;
    //
    //             // 获取抬升的图层
    //             var toplayer = layers.get(this.layers[lyr].index);
    //
    //             // 将图层抬升到最上层
    //             layers.raiseToTop(toplayer);
    //
    //             // 更改图层的索引为最上层
    //             var nowLyrIndex = viewer.imageryLayers.length - 1
    //             this.layers[lyr].index = nowLyrIndex;
    //
    //         } else {
    //             //该图层没有加载
    //             this.layers.push(layerObject)
    //             viewer.imageryLayers.add(layer);
    //
    //         }
    //     }
    //
    //     return viewer.imageryLayers.length;
    // }

    // static layerJudgment(layerObject){
    //     if(this.layers.length==0){
    //         console.log("layers数组为空，该图层没有被加载")
    //         this.layers.push(layerObject)
    //         return false
    //     }
    //     for(var lyr in this.layers){
    //         if(this.layers[lyr].url == layerObject.url){
    //
    //             console.log("该图层已加载，将其抬升")
    //             // 根据该图层索引，将其抬升到最上层
    //             CesiumImageryLayer.bringLayerToTop(this.layers[lyr].index)
    //
    //             // 抬升该图层后，更新该图层的索引属性（index）
    //             var nowLyrIndex = viewer.imageryLayers.length-1
    //             this.layers[lyr].index = nowLyrIndex;
    //
    //             return true
    //         }else{
    //             console.log("该图层没有加载")
    //             this.layers.push(layerObject)
    //             return false
    //         }
    //
    //     }
    // }


    static bringLayerToTop(index) {
        var layers = viewer.scene.imageryLayers;
        var layer = layers.get(index);
        layers.raiseToTop(layer);
    }

    static loadArcGISbyType(viewer, i = 0) {
        var Type;
        if (i == 0) {
            Type = Cesium.ArcGisBaseMapType.SATELLITE;
        } else if (i == 1) {
            Type = Cesium.ArcGisBaseMapType.OCEANS;
        } else if (i == 2) {
            Type = Cesium.ArcGisBaseMapType.HILLSHADE;
        }

        var imageryProvider = Cesium.ImageryLayer.fromProviderAsync(
            Cesium.ArcGisMapServerImageryProvider.fromBasemapType(Type)
        );
        viewer.imageryLayers.add(imageryProvider);

    }

    // static loadArcGISbyType(viewer, typeIndex = 0) {
    //
    //     var mapType;
    //     switch (typeIndex) {
    //         case 0:
    //             mapType = Cesium.ArcGisBaseMapType.SATELLITE;
    //             break;
    //         case 1:
    //             mapType = Cesium.ArcGisBaseMapType.OCEANS;
    //             break;
    //         case 2:
    //             mapType = Cesium.ArcGisBaseMapType.HILLSHADE;
    //             break;
    //     }
    //     var imageryProvider = Cesium.ImageryLayer.fromProviderAsync(
    //         Cesium.ArcGisMapServerImageryProvider.fromBasemapType(
    //             mapType
    //         )
    //     );
    //     viewer.imageryLayers.add(imageryProvider);
    //
    // }

    static addGoogleMapsLayer1(viewer) {
        var url = 'https://gac-geo.googlecnapps.cn/maps/vt?x={x}&y={y}&z={z}&lyrs=y';
        const options = {
            "url": url,
        };
        var googleImageryProvider = new Cesium.UrlTemplateImageryProvider(options);

        viewer.imageryLayers.addImageryProvider(googleImageryProvider);

    }

    static removealllayer(viewer) {
        viewer.imageryLayers.removeAll();
        viewer.scene.primitives.removeAll();
    }

    static removetop(viewer) {

        var layerCollection = viewer.scene.layers;
        var topLayer = viewer.imageryLayers.get(viewer.imageryLayers.length - 1);
        viewer.imageryLayers.remove(topLayer);
        viewer.scene.requestRender();

    }

    static mapRoll(viewer, splitPosition) {
        const layer0 = viewer.imageryLayers.get(viewer.imageryLayers.length - 1);
        const layer1 = viewer.imageryLayers.get(viewer.imageryLayers.length - 2);
        layer0.splitDirection = Cesium.SplitDirection.LEFT;
        layer1.splitDirection = Cesium.SplitDirection.RIGHT;
        viewer.scene.splitPosition = splitPosition;
    }

}


export default CesiumImageryLayer;