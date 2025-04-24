// Cesium195版本使用
export default class TetrahedronPrimitive {
    _modelMatrix = null
    drawCommand = null
    _viewer = undefined
    texture = null
    image = null
    _angle = 10
    _height = 100
    _enuMatrix = undefined
    _scaleMatrix = undefined
    _scale = undefined
    _speed = undefined
    _color = undefined
    _distance = Cesium.defaultValue(1, 1);
    constructor(options) {
        this._localPosition = options.position
        this._scale = Cesium.defaultValue(options.scale,new Cesium.Cartesian3(10, 10, 15))
        this._speed = Cesium.defaultValue(options.speed, 1.0)
        this._color = Cesium.defaultValue(
            options.color,
            new Cesium.Color(1.0, 0.0, 0.0, 0.18)
        );
        this._modelMatrix = this.computeModelMatrix();
        this._viewer = options.viewer;
    }
    generateGeometry() {
 
        var positions = new Float64Array(5 * 3);
        // position 0
        positions[0] = 0.0;
        positions[1] = 1.0;
        positions[2] = 0.0;
 
        // position 1
        positions[3] = -1.0;
        positions[4] = 0.0;
        positions[5] = 0.0;
 
        // position 2
        positions[6] = 0.0;
        positions[7] = -1.0;
        positions[8] = 0.0;
 
        // position 3
        positions[9] = 1.0;
        positions[10] = 0.0;
        positions[11] = 0.0;
 
        // position 4
        positions[12] = 0.0;
        positions[13] = 0.0;
        positions[14] = -1.0;
 
        var indices = new Uint16Array(6 * 3);
        // back triangle
        indices[0] = 4;
        indices[1] = 2;
        indices[2] = 3;
 
        // left triangle
        indices[3] = 4;
        indices[4] = 3;
        indices[5] = 0;
 
        // right triangle
        indices[6] = 4;
        indices[7] = 0;
        indices[8] = 1;
 
        // bottom triangle
        indices[9] = 4;
        indices[10] = 1;
        indices[11] = 2;
        // bottom triangle
        indices[12] = 1;
        indices[13] = 2;
        indices[14] = 3;
 
        // bottom triangle
        indices[15] = 1;
        indices[16] = 3;
        indices[17] = 0;
 
        // 1.3 定义纹理数组
        // var sts = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.5, 0.5]);
 
        let geometry = new Cesium.Geometry({
            attributes: {
                position: new Cesium.GeometryAttribute({
                    componentDatatype: Cesium.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: positions,
                }),
                // 设置纹理的时候需要配置
                // textureCoordinates: new Cesium.GeometryAttribute({
                //     componentDatatype: Cesium.ComponentDatatype.FLOAT,
                //     componentsPerAttribute: 2,
                //     values: sts,
                // }),
            },
            indices: indices,
            primitiveType: Cesium.PrimitiveType.TRIANGLES,
            boundingSphere: Cesium.BoundingSphere.fromVertices(
                positions
            ),
        });
 
        return geometry;
    }
    computeModelMatrix(){
        let enuMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            this._localPosition
        );
        let scaleMatrix = Cesium.Matrix4.fromScale(this._scale);
        let modelMatrix = Cesium.Matrix4.multiply(
            enuMatrix,
            scaleMatrix,
            new Cesium.Matrix4()
        );
        this._scaleMatrix = scaleMatrix;
        this._enuMatrix = enuMatrix;
        return modelMatrix;
    }
  createCommand(context) {
    const geometry = this.generateGeometry()
 
    const vertexArray = Cesium.VertexArray.fromGeometry({
        geometry: geometry,
        context: context,
        attributeLocation:Cesium.GeometryPipeline.createAttributeLocations(geometry)
    })
 
    const shaderProgram = Cesium.ShaderProgram.fromCache({
        context: context,
        vertexShaderSource: `
            precision highp float;
            attribute vec3 position;
            attribute vec2 st;
            varying vec2 v_st;
            void main() {
                v_st = st;
                gl_Position = czm_projection * czm_modelView * vec4(position, 1.0);
            }
        `,
        fragmentShaderSource: `
            varying vec2 v_st;
            // sampler2D 其实是一个图片源经过webgl处理的一个像素数据集
            uniform sampler2D wenli;
            uniform vec4 color;
            void main() {
                czm_materialInput materialInput;
                czm_material material = czm_getDefaultMaterial(materialInput);
                material.diffuse = vec3(color.rgb);
                material.alpha = color.a;
                // 设置颜色
                gl_FragColor = vec4(color);
                // 设置纹理贴图
                // gl_FragColor = texture2D(wenli, v_st);
            }
        `,
        attributeLocation: Cesium.GeometryPipeline.createAttributeLocations(geometry)
    })
    
    const uniformMap = {
        color:  ()=> {
            return this._color;
        },
        wenli: () => {
            if (!this.texture) {
            return context.defaultTexture
            }
            return this.texture
        }
    }
    const renderState = Cesium.RenderState.fromCache({
        depthTest: {
            enabled: false
        }
    })
 
    this.drawCommand = new Cesium.DrawCommand({
        vertexArray: vertexArray,
        shaderProgram: shaderProgram,
        uniformMap: uniformMap,
        renderState: renderState,
        pass: Cesium.Pass.TRANSLUCENT,      //开启透明度   https://blog.csdn.net/esoft_weixiuyong/article/details/122338351
        modelMatrix: this._modelMatrix
    })
  }
    //开启动画
    startAnimate(){
        let that = this;
        this.computeHeight();
        this._setInterval = setInterval(animateFunc, 5);
        function animateFunc() {
            that._angle = that._angle + 0.01;
            Math.sin(that._angle) > 0
                ? (that._height = 0.005)
                : (that._height = -0.005);
            let translation = new Cesium.Cartesian3(0, 0, that._height);
            Cesium.Matrix4.multiplyByTranslation(
                that._modelMatrix,
                translation,
                that._modelMatrix
            );
            let rotationZ = Cesium.Matrix4.fromRotationTranslation(
                Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(that._speed))
            );
            Cesium.Matrix4.multiply(
                that._modelMatrix,
                rotationZ,
                that._modelMatrix
            );
        }
 
    }
    //关闭动画
    closeAnimate() {
        clearInterval(this._setInterval);
    }
    computeHeight() {
        let point = Cesium.Cartesian3.fromElements(
            0,
            0,
            this._distance,
            new Cesium.Cartesian3()
        );
        let enuPoint = Cesium.Matrix4.multiplyByPoint(
            this._enuMatrix,
            point,
            new Cesium.Cartesian3()
        );
        let upPositionEC = Cesium.Matrix4.multiplyByPoint(
            this._viewer.scene.camera._viewMatrix,
            enuPoint,
            new Cesium.Cartesian3()
        );
        let upPositionPC = Cesium.Matrix4.multiplyByPoint(
            this._viewer.scene.camera.frustum.projectionMatrix,
            upPositionEC,
            new Cesium.Cartesian3()
        );
        return Cesium.Cartesian3.normalize(upPositionPC, new Cesium.Cartesian3()).z;
    }
    // 创建纹理
    createTextures = (context) => {
        if (this.image) return
        this.image = new Image()
        this.image.src = '../images/blue12.png'
        this.image.onload = () => {
        this.texture = new Cesium.Texture({
            context: context,
            source: this.image
        })
        }
    }
    update(frameState) {
        this.createCommand(frameState.context)
        if (!this.texture) {
            this.createTextures(frameState.context)
        }
        frameState.commandList.push(this.drawCommand)
    }
}