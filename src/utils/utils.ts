import pako from "pako";
import { Base64 } from "js-base64";
import { md5 } from "js-md5";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import * as config from "./config";

class Device {
  _userAgent: string;
  _isWeixin: Boolean;
  _isChorme: Boolean;
  _isIosQQ: Boolean;
  _isAndroidQQ: Boolean;
  _deviceIsAndroid: Boolean;
  _deviceIsIOS: Boolean;
  _IOSVersion: number;

  constructor() {
    this._userAgent = "";
    this._isWeixin = false;
    this._isChorme = false;
    this._isIosQQ = false;
    this._isAndroidQQ = false;
    this._deviceIsAndroid = false;
    this._deviceIsIOS = false;
    this._IOSVersion = 0;
  }

  get userAgent() {
    return this._userAgent;
  }

  set userAgent(value: string) {
    this._userAgent = value;
  }

  get isWeixin() {
    var regResult: RegExpMatchArray | null =
      this.userAgent.match(/MicroMessenger/i);
    if (regResult && regResult[0] == "MicroMessenger") {
      this._isWeixin = true;
    } else {
      this._isWeixin = false;
    }
    return this._isWeixin;
  }

  get isChorme() {
    this._isChorme = this.userAgent.indexOf("Chrome") === -1 ? false : true;
    return this._isChorme;
  }

  /**
   * 判断是否是iphone手机qq浏览器
   */
  get isIosQQ() {
    this._isIosQQ = /.+iPhone.+QQ.+/g.test(this.userAgent);
    return this._isIosQQ;
  }

  /**
   * 判断是否是Android手机qq浏览器
   */
  get isAndroidQQ() {
    this._isAndroidQQ = /.+(?:MQQBrowser).+(?:TBS).+/g.test(this.userAgent);
    return this._isAndroidQQ;
  }

  /**
   * 判断是否为Android系统
   */
  get deviceIsAndroid() {
    this._deviceIsAndroid = this.userAgent.indexOf("Android") > 0;
    return this._deviceIsAndroid;
  }

  /**
   * 判断是否为IOS
   */
  get deviceIsIOS() {
    this._deviceIsIOS = /iP(?:ad|hone|od)/g.test(this.userAgent);
    return this._deviceIsIOS;
  }

  /**
   * 获取IOS系统版本，如果当前系统非IOS返回null
   */
  get IOSVersion() {
    if (this._deviceIsIOS) {
      var regResult = /OS (\d+)_\d*/.exec(this.userAgent);
      return regResult && regResult[1];
    }
    return null;
  }
}

const device = new Device();

/**
 *  包含路径拼接参数的schema
 */
var createSchemaWithpath = function (
  options: { [x: string]: string | number | boolean },
  path: string
) {
  path = path.replace(/^\//, "");
  if (path.includes("index.html")) {
    path = path.replace(/index\.html/, "");
  }
  var urlSchema = device.deviceIsIOS
      ? config.ulLink
      : device.deviceIsAndroid
      ? device.isWeixin
        ? config.yybLink
        : config.androidSchema
      : config.androidSchema,
    tempStr = path;
  if (urlSchema === null) return;
  if (!options) {
    return urlSchema;
  }
  for (var item in options) {
    tempStr.indexOf("?") == -1
      ? (tempStr =
          tempStr + "?" + item + "=" + encodeURIComponent(options[item]) + "&")
      : (tempStr =
          tempStr + item + "=" + encodeURIComponent(options[item]) + "&");
  }

  urlSchema = urlSchema + tempStr;
  //去除最后的&符号
  urlSchema = urlSchema.substring(0, urlSchema.length - 1);
  console.log(urlSchema);
  return urlSchema;
};

/**
 * 解压
 * @param {Object} b64Data base64数据
 * @return {type}
 */
var unzip = function (b64Data: string) {
  var strData = Base64.atob(b64Data);
  // Convert binary string to character-number array
  var charData = strData.split("").map(function (x) {
    return x.charCodeAt(0);
  });
  // Turn number array into byte-array
  var binData = new Uint8Array(charData);
  // console.log(binData)

  try {
    // unzip
    // var data = pako.inflate(binData);
    // strData = readUTF(data);

    // var arr = new Uint16Array(data);
    // var numArr: number[] = Array.from(arr);
    // strData = String.fromCodePoint.apply(null, numArr);

    strData = pako.ungzip(binData, { to: "string" });
    // console.log(strData);
  } catch (e) {
    console.log(e);
    strData = pako.ungzip(binData, { to: "string" });

    // Convert gunzipped byteArray back to ascii string:
    // strData   = String.fromCharCode.apply(null, new Uint16Array(data));
  }
  // console.log(strData);
  return strData;
};

// 读取UTF8编码的字节，并专为Unicode的字符串
var readUTF = function (arr: Uint8Array) {
  if (typeof arr === "string") {
    return arr;
  }
  var UTF = "",
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      UTF += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      UTF += String.fromCharCode(_arr[i]);
    }
  }
  return UTF;
};

/** 压缩
 * @param {Object} str 需要压缩的字符串
 */
var zip = function (str: string) {
  // var binaryString = pako.gzip(encodeURIComponent(str), {
  //   to: "string",
  // });
  // return btoa(binaryString);
};

/**
 * 判断参数是否为Json字符串，如果是则转换为对象
 * @param {Object} data
 */
var getObjectFromJson = function (data: string) {
  if (typeof data === "string") {
    // return JSON.parse(data);
    // 中文字符串转义
    let endoce_dataString;
    try {
      // endoce_dataString = decodeURIComponent(data)
      endoce_dataString = data;
    } catch (error) {
      endoce_dataString = data;
    }
    try {
      return JSON.parse(
        endoce_dataString.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
      ); //后端接口返回的数据换行采用了\r\n方式，使得json文本无法解析带换行符的内容
    } catch (error) {
      console.log(error);
      return data;
    }
  }
  return data;
};

function validPhoneNumber(phoneNumber: string) {
  var reg = /^1[0-9]{10,10}$/;
  return reg.test(phoneNumber);
}

function validTextString(str: string) {
  var reg = /^[\u4e00-\u9fa5a-z ]+$/gi;
  return reg.test(str);
}

/**
 * @param {String} url
 * @param {Number} num
 *  * 图片大小规范:
    _0:原图(非原图上传或头像上传时,不保存原图)
    _1:等尺寸压缩图
    _2:120
    _3:240
    _4:360
 */
var formatImgUrl = function (url: string | undefined) {
  if (url === undefined) {
    return "/sc_atc_default.png";
  }
  if (/^https?:\/\/.*/i.test(url)) {
    return url;
  }
  return config.enConfig.url + url;
};

const PWDMD5EncodedString = (self: string) => {
  const saltString: string = getSaltString(self);
  let tempMD5String: string = self + saltString;
  tempMD5String = md5(tempMD5String);
  tempMD5String = MD5Substr(tempMD5String);
  tempMD5String = reverseString(tempMD5String);
  tempMD5String = md5(tempMD5String);
  return tempMD5String;
};

const getSaltString = (self: string) => {
  const key = "dv329dfvsafdwbrgelvirvd";
  const strLen = self.length;
  let resultString = "";
  for (let i = 0; i < strLen; i += 3) {
    resultString += self.charAt(i);
  }
  resultString += key;
  return resultString;
};

const MD5Substr = (self: string) => {
  const len = self.length;
  let resultString = "";
  let tempStringHead = self.substring(0, len / 2);
  tempStringHead = md5(tempStringHead);
  let tempStringFoot = self.substring(len / 2);
  tempStringFoot = md5(tempStringFoot);
  resultString = tempStringHead + tempStringFoot;
  return resultString;
};

//定义一个函数将字符串反转
const reverseString = (self: string) => {
  let resultString = "";
  for (let i = self.length - 1; i >= 0; i--) {
    resultString += self.charAt(i);
  }
  return resultString;
};

const mobileId = async () => {
  return (await deviceUUID()) + "v1.0";
};

const deviceUUID = async () => {
  return new Promise((resolve, reject) => {
    const fpPromise = FingerprintJS.load();
    // Get the visitor identifier when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        console.log(visitorId);
        resolve(visitorId);
      });
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  device,
  deviceUUID,
  mobileId,
  createSchemaWithpath,
  PWDMD5EncodedString,
  unzip,
  zip,
  getObjectFromJson,
  validPhoneNumber,
  validTextString,
  formatImgUrl,
};
