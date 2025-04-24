class CesiumMaterial {

    //CheckerboardMaterialProperty（棋盘格材质属性）
    static checkerboardMaterialProperty(evenColor,oddColor,x,y){
        var checkerboardMaterial = new Cesium.CheckerboardMaterialProperty({
            evenColor: Cesium.Color.fromCssColorString(evenColor),
            oddColor:  Cesium.Color.fromCssColorString(oddColor),
            repeat: new Cesium.Cartesian2(x,y)
        });
        return checkerboardMaterial
    }

    // ColorMaterialProperty（颜色材质属性）
    static colorMaterialProperty(colorStr){
        var colorMaterial =   new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(colorStr));
        return colorMaterial;
    }

    //  GridMaterialProperty（网格材质属性）
    static gridMaterialProperty(color,cellAlpha,lncntX,lncntY,lnThX,lnThY){
        var gridMaterial = new Cesium.GridMaterialProperty({
            color: Cesium.Color.fromCssColorString(color),
            cellAlpha: cellAlpha,
            lineCount: new Cesium.Cartesian2(lncntX, lncntY),
            lineThickness: new Cesium.Cartesian2(lnThX, lnThY)
        });
        return gridMaterial;
    }

    // ImageMaterialProperty（图片材质属性）
    static imageMaterialProperty(imgUrl,x,y,alpha,color,transparent=true){
        var imageMaterial = new Cesium.ImageMaterialProperty({
            image: imgUrl,
            repeat: new Cesium.Cartesian2(x, y),
            alpha: alpha, // 设置透明度为0.5
            color:Cesium.Color.fromCssColorString(color),
            transparent:transparent,
        });
        return imageMaterial;
    }

    // PolylineArrowMaterialProperty（箭头线材质属性）
    static polylineArrowMaterialProperty(color){
        var arrowMaterial = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(color));
        return arrowMaterial
    }

   // PolylineDashMaterialProperty（虚线材质属性）
    static polylineDashMaterialProperty(color,dashLength){
        var dashMaterial = new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.fromCssColorString(color),
            dashLength:dashLength
        });
        return dashMaterial;
    }

    // PolylineGlowMaterialProperty（发光线材质属性）
    static polylineGlowMaterialProperty(color,glowPower){
        var glowMaterial = new Cesium.PolylineGlowMaterialProperty({
            color: Cesium.Color.fromCssColorString(color),
            glowPower:glowPower,
            taperPower: 0.5  // 设置两端的逐渐变暗程度
        });
        return glowMaterial
    }

    //PolylineOutlineMaterialProperty（轮廓线材质属性）：
    static polylineOutlineMaterialProperty(color,outlineColor,outlineWidth){
        var outlineMaterial = new Cesium.PolylineOutlineMaterialProperty({
            color:  Cesium.Color.fromCssColorString(color),
            outlineColor:  Cesium.Color.fromCssColorString(outlineColor),
            outlineWidth: outlineWidth
        });
        return outlineMaterial;
    }

    // StripeMaterialProperty（条纹材质属性）
    static stripeMaterialProperty(evenColor,oddColor,offset,repeat){
        var stripeMaterial = new Cesium.StripeMaterialProperty({
            evenColor:Cesium.Color.fromCssColorString(evenColor),
            oddColor:Cesium.Color.fromCssColorString(oddColor),
            offset: offset,
            repeat: repeat
        });
        return stripeMaterial;
    }

}export default CesiumMaterial