const linkConfig = {
  dev: {
    url: "http://172.20.0.251",
    imgUrl: "http://172.20.0.251",
    mediaUrl: "http://172.20.0.251",
    h5Url: "",
  },

  test: {
    url: "http://172.20.0.252",
    imgUrl: "http://172.20.0.252",
    mediaUrl: "http://172.20.0.252",
    h5Url: "",
  },

  product: {
    url: "https://app.lianxi.com",
    imgUrl: "https://app.lianxi.com",
    mediaUrl: "https://app.lianxi.com",
    h5Url: "https://webqc.lianxi.com",
  },

  publish: {
    url: "https://testapp.lianxi.com",
    imgUrl: "https://testapp.lianxi.com",
    mediaUrl: "https://testapp.lianxi.com",
    h5Url: "https://h5test.lianxi.com",
  },
};
type ObjectKey = keyof typeof linkConfig;

class EnConfig {
  private _envMode: ObjectKey;
  public get envMode(): ObjectKey {
    return this._envMode;
  }
  public set envMode(value: ObjectKey) {
    this._envMode = value;
  }

  private _url: string;
  public get url(): string {
    this._url = linkConfig[this._envMode].url;
    return this._url;
  }

  constructor() {
    this._envMode = "publish";
    this._url = linkConfig[this._envMode].url;
  }
}
export const enConfig: EnConfig = new EnConfig();

// const keys = process.env.serverMode as ObjectKey;

/**
 *  H5应用服务器地址
 */
// export var url: string = linkConfig[keys].url;

/**
 * androidBetaDownloadUrl: 安卓应用Beta版下载地址
 * androidReleaseDownloadUrl: 安卓应用正式版下载地址
 *
 * iosBetaDownloadUrl: ios应用Beta版下载地址
 * iosReleaseDownloadUrl: ios应用正式版下载地址
 *
 * devUrl:  H5应用开发服务器地址
 * testUrl: H5应用测试服务器地址
 * prodUrl: H5应用生产服务器地址
 *
 * yybLink: 应用宝链接地址
 */
let config = {
  androidSchema: "lianxifrl://",
  iosSchema: "lianxifrl://",
  androidBetaDownloadUrl: "http://app.lianxi.com",
  androidReleaseDownloadUrl: "http://app.lianxi.com",
  iosBetaDownloadUrl: "http://app.lianxi.com",
  iosReleaseDownloadUrl: "https://apps.apple.com/cn/app/id6474501857?l=zh&ls=1",
  iosTestlight: "https://testflight.apple.com/join/lqPbnpsf",
  ulLink: "https://app.lianxi.com/unilink/",
  yybLink: "http://a.app.qq.com/o/simple.jsp?pkgname=com.tixa.zq",
  prePath: "",
  env: "pro", //pro|dev
};

export var iosSchema = config.iosSchema;

export var androidSchema = config.androidSchema;

/**
 * android应用下载地址
 *
 * config["androidDownloadUrl"]的值可能是：
 * 1: config.androidBetaDownloadUrl,对应测试环境下载地址
 * 2: config.androidReleaseDownloadUrl,对应生产环境下载地址
 */
export var androidDownloadUrl = config.androidReleaseDownloadUrl;

/**
 * IOS应用下载地址
 *
 * config["iosDownloadUrl"] 的值可能是：
 * 1: config.iosBetaDownloadUrl,对应测试环境下载地址
 * 2: config.iosReleaseDownloadUrl,对应生产环境下载地址
 * 3: config.iosTestlight
 */
export var iosDownloadUrl = config.iosReleaseDownloadUrl;
// export var iosDownloadUrl = config.iosTestlight;

/**
 * ios9以上使用，通用链接地址
 */
export var ulLink = config.ulLink;
// export var h5Url: string = linkConfig[keys].h5Url;

/**
 * 应用宝链接地址
 */
export var yybLink = config.yybLink;
