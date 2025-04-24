class CesiumScreenSpace {
    static addCombinationAction(viewer, combination, action, type) {
        const handler = viewer.screenSpaceEventHandler;

        const keyCombination = combination.split('+');
        const keyCodes = keyCombination.map(key => {
            switch (key) {
                case 'ctrl':
                    return Cesium.KeyboardEventModifier.CTRL;
                case 'alt':
                    return Cesium.KeyboardEventModifier.ALT;
                case 'shift':
                    return Cesium.KeyboardEventModifier.SHIFT;
                default:
                    return key.toUpperCase().charCodeAt(0);
            }
        });

        handler.setInputAction(action, type, ...keyCodes);
    }

    static addCtrlArrowEvent(eventKey,callback1=undefined,callback2=undefined,callback3=undefined,callback4=undefined) {
        document.addEventListener(eventKey, function(event) {
            if (event.ctrlKey) {
                switch (event.key){
                    case "ArrowUp":
                        console.log("up"+event.key);

                        callback4
                        break;
                    case "ArrowDown":
                        console.log("ArrowDown"+event.key);

                        callback3();
                        break;
                    case "ArrowLeft":
                        console.log("ArrowLeft");

                        callback1();
                        break;
                    case "ArrowRight":
                        console.log("ArrowRight");

                        callback2();
                        break;
                }
            }
        });
    }

    static addMouseWheelEvent(callback,callback1) {
        document.addEventListener("wheel", function(event) {
            if (event.ctrlKey) {
            if (event.deltaY < 0) {
                console.log("上滑");
                callback();
            } else if (event.deltaY > 0) {
                console.log("下滑");
                callback1();
            }}
        });
    }

    static addAction(viewer,action,type){
        const handler = viewer.screenSpaceEventHandler;
        handler.setInputAction(action,type)
    }

    static removeAction(viewer,type){
        const handler = viewer.screenSpaceEventHandler;
        handler.removeInputAction(type)
    }
}
export default CesiumScreenSpace;