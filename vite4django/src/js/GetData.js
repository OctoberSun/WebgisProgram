import axios from "axios";
class GetData {
  static async getAllFeature(url, typeNames) {
    const config = {
      method: "GET",
      // baseURL: "http://localhost:8084/geoserver",
      url: url,
      params: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        outputFormat: "application/json",
        typeNames: typeNames,
      },
    };
    var count;

    try {
      const response = await axios.request(config);
      // 处理响应数据
    //  console.log(response.data);
      // 计算要素数量
      const features = response.data.features;
      const count = features.length;
     // console.log(`图层中包含 ${count} 个元素`);
      return count; // 此时 count 已经有值了
    } catch (exception) {
      // 处理请求异常
      console.error("请求WFS服务时出错:", exception);
      throw exception; // 重新抛出异常，以便调用者可以处理
    }

    // return count;
  }

  static async getPartFeature(platformnumber) {
    const config = {
      method: "GET",
      baseURL: "http://localhost:8084/geoserver",
      url: "argoproject/ows",
      params: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        outputFormat: "application/json",
        typeNames: "argoproject:argometa",
        propertyName: "*",
        cql_filter: "platformnumber=" + platformnumber, //// cql_filter=INTERSECTS(the_geom,POINT(-74.817265 40.5296504))
        // "sortBy": "cyclenumber A", //str1 A
      },
    };

    try {
      const response = await axios.request(config);
      // 处理响应数据
      const properties = response.data.features[0].properties;

      return properties; // 此时 count 已经有值了
    } catch (exception) {
      // 处理请求异常
      console.error("请求WFS服务时出错:", exception);
      throw exception; // 重新抛出异常，以便调用者可以处理
    }

  }

  static async getPartFeatureLocation(platformnumber) {
    const config = {
      method: "GET",
      baseURL: "http://localhost:8084/geoserver",
      url: "argoproject/ows",
      params: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        outputFormat: "application/json",
        typeNames: "argoproject:argometa",
        propertyName: "launchlat,launchlon",
        cql_filter: "platformnumber=" + platformnumber, //// cql_filter=INTERSECTS(the_geom,POINT(-74.817265 40.5296504))
        // "sortBy": "cyclenumber A", //str1 A
      },
    };

    try {
      const response = await axios.request(config);
      // 处理响应数据
      console.log(response.data.features[0].properties);
      // 将response.data.features[0].properties下的数据作为数组返回
      const properties = response.data.features[0].properties;
      let location = [properties.launchlat, properties.launchlon];

      return location; 
    } catch (exception) {
      // 处理请求异常
      console.error("请求WFS服务时出错:", exception);
      throw exception; // 重新抛出异常，以便调用者可以处理
    }
  }

  static async getPartFeatureLocus(platformnumber) {
    const config = {
      method: "GET",
      baseURL: "http://localhost:8084/geoserver",
      url: "argoproject/ows",
      params: {
        service: "WFS",
        version: "2.0.0",
        request: "GetFeature",
        outputFormat: "application/json",
        typeNames: "argoproject:argoheader",
        propertyName: "longitude,latitude",
        cql_filter: "platformnumber=" + platformnumber, //// cql_filter=INTERSECTS(the_geom,POINT(-74.817265 40.5296504))
        sortBy: "cyclenumber A", //str1 A
      },
    };
    try {
      const response = await axios.request(config);
      // 处理响应数据
      console.log(response.data.features[0].properties);
      // 将response.data.features[0].properties下的数据作为数组返回
      const properties = response.data.features
      // 遍历获取所有的经纬度
       var locus = []
       for (let i = 0; i < properties.length; i++) {
         const property = properties[i].properties;
         let location = [property.longitude, property.latitude,0];
         locus.push(location)
       }
       return locus; // 此时 count 已经有值了
    } catch (exception) {
      // 处理请求异常
      console.error("请求WFS服务时出错:", exception);
      throw exception; // 重新抛出异常，以便调用者可以处理
    }
  }
}
export default GetData;
