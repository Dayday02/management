<template>
  <el-row>
    <el-col :span="8" style="padding: 10px;">
      <el-card class="box-card">
        <homeUser></homeUser>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData" style="width: 100%">
          <!-- <el-table-column
                        prop="name"
                        label="课程">
                    </el-table-column>
                    <el-table-column
                        prop="todayBuy"
                        label="今日购买">
                    </el-table-column>
                    <el-table-column
                        prop="monthBuy"
                        label="本月购买">
                    </el-table-column>
                    <el-table-column
                        prop="totalBuy"
                        label="总购买">
                    </el-table-column> -->
          <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val" :key="key" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding: 10px;">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex' }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="echarts2" style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api'
import homeUser from './home-user.vue';
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [
      ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]

    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.getStatisticalData.data
      this.tableData = tableData
      console.log(tableData);

      //折线图
      const echarts1 = echarts.init(this.$refs.echarts1)
      const { orderData , userData } = data.getStatisticalData.data
      const xAxis = Object.keys(orderData.data[0])
      console.log(orderData.data);
      var echarts1option = {
      }
      echarts1option.xAxis = {
        data: [2017, 2018, 2019, 2020, 2021, 2022]
      }
      echarts1option.yAxis = {}
      echarts1option.legend = {
        data: xAxis
      }
      echarts1option.series = []
      xAxis.forEach(key => {
        echarts1option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      console.log(echarts1option);

      echarts1.setOption(echarts1option)
    

    //柱状图
    const echarts2 = echarts.init(this.$refs.echarts2)
    const echarts2option={
      legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: userData.map(item=>item.date),
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [
      {
         name:'新增用户',
         data:userData.map(item=>item.new),
         type:'bar'
      },
      {
         name:'活跃用户',
         data:userData.map(item=>item.active),
         type:'bar'
      }
    ],
    
    }
    echarts2.setOption(echarts2option)
  })
  },   
  components: {
    homeUser
  }
}
</script>
<style lang="less" scoped>
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: white;
  }

  .detail {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}</style>