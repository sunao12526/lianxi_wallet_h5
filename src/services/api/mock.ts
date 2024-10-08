import axios from "axios"
import MockAdapter from "axios-mock-adapter"

// 创建一个新的MockAdapter实例
const mock = new MockAdapter(axios, { delayResponse: 1000 })

const setupMocks = () => {
  // 拦截所有请求，并返回模拟数据

  // restful api 创建订单
  mock.onPost("/api/login").reply((config) => {
    const { data } = config
    console.log(data)
    return [201, { authToken: "sdfsdfdsfdsfsdfsdf", authType: "管理员" }]
  })

  // restful api 创建订单
  mock.onPost("/api/orders").reply((config) => {
    const { data } = config
    return [201, data]
  })
  // restful api 更新订单
  mock.onPut(/\/api\/orders\/*/).reply((config) => {
    const { data } = config
    return [201, data]
  })
  // restful api 删除订单
  mock.onDelete(/\/api\/orders\/*/).reply(() => {
    return [201]
  })
  // restful api 获得订单详情
  // mock.onGet(/\/api\/orders\/*/).reply(() => {
  //   return [
  //     201,
  //     {
  //       guid: "1234567894",
  //       status: "状态1",
  //       name: "孙奥",
  //       phone: "18610239000",
  //       price: 10000,
  //       total: 3,
  //       address: "北京市海淀区中关村大街1号",
  //       description:
  //         "描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情",
  //       createdAt: "2019-08-30T15:46:57.000Z",
  //       updatedAt: "2019-08-30T15:46:57.000Z",
  //     },
  //   ]
  // })
  // restful api 获得订单列表
  mock.onGet("/api/orders").reply(() => {
    return [
      201,
      [
        {
          id: 0,
          status: "Statu1",
          name: "欧恩科(北京) 自动门科技有限公司0enke (Beijingautomatic doorTechnology Co.Ltd",
          phone: "18610239000",
          price: 10000,
          total: 4,
          address: "北京市海淀区中关村大街1号",
          description:
            "描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情",
          medias:
            "https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg,https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg,https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
        },
        {
          id: 1,
          status: "Statu1",
          name: "欧恩科(北京) 自动门科技有限公司0enke (Beijingautomatic doorTechnology Co.Ltd",
          phone: "18610239000",
          price: 10000,
          total: 4,
          address: "北京市海淀区中关村大街1号",
          description:
            "描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情描述详情",
          medias:
            "https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg,https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg,https://app.lianxi.com/upload/im/extFile/file14033/1719749565605ohdhuBuL_1.jpg",

          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
        },
      ],
    ]
  })

  // restful api 创建products
  mock.onPost("/api/products").reply((config) => {
    const { data } = config
    return [201, data]
  })
  // restful api 更新products
  mock.onPut(/\/api\/products\/*/).reply((config) => {
    const { data } = config
    return [201, data]
  })
  // restful api 删除products
  mock.onDelete(/\/api\/products\/*/).reply(() => {
    return [201]
  })
  // restful api 获得products详情
  // mock.onGet(/\/api\/products\/*/).reply((config) => {
  //   const { data } = config
  //   return [201, data]
  // })
  // restful api 获得products列表
  mock.onGet("/api/products").reply(() => {
    return [
      201,
      [
        {
          id: 0,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1080,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "手动单开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },
        {
          id: 1,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1480,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "手动双开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 2,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1240,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "手动子母门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 3,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1480,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "90度电动双开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },
        {
          id: 4,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1480,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "电动平开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 5,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1080,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动单开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },
        {
          id: 6,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1480,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动双开门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 7,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1240,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动子母门",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 8,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1080,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动单开门重型",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },
        {
          id: 9,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1480,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动双开门重型",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },

        {
          id: 10,
          orderId: 0,
          floor: "1",
          roomName: "麻醉值班室",
          number: 1,
          doorType: "测试数据",
          doorWidth: 1240,
          doorHeight: 2280,
          wallThickness: 135,
          wallMaterial: "测试数据",
          weight: 1,
          direction: "左开",
          color: "门体、门框钢板喷涂颜色9D10",
          window: "圆角平面窗5mm双层钢化玻璃",
          openMethod: "脚踏+按钮*2",
          pullHand: "圆管拉手",
          collisionCover: "有",
          light: "有",
          leftPile: "",
          rightPile: "",
          createdAt: "2019-08-30T15:46:57.000Z",
          updatedAt: "2019-08-30T15:46:57.000Z",
          module: "铅防护手动子母门重型",
          doorFrameWidth: 30,
          doorFrameHeight: 30,
          holeWidth: 395,
          holeLength: 495,
          holeHeight: 1500,
          frameDesc: "不锈钢子母合页",
          unit: "樘",
          nums: 3,
          remark: "",
        },
      ],
    ]
  })
}
export default setupMocks
