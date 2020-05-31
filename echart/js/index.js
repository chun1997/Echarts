// 薪资分析--饼图
(function () {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 指定配置和数据
  fetch('http://localhost:3000/data').then(res => res.json())
    .then(res => {
      // console.log(res[1].time);
      let money = []

      res.forEach(item => {
        if (item.title) {
          let a = parseInt(item.money_min.split('k').join(''))
          let b = parseInt(item.money_max.split('k').join(''))
          let c = Math.ceil((a + b) / 2)
          money.push(c)
        }

      })
      // console.log(money.sort());
      let num1 = 0
      let num2 = 0
      let num3 = 0
      let num4 = 0
      let num5 = 0
      let num6 = 0
      let num7 = 0

      for (var i = 0; i < money.length; i++) {
        0 < money[i] && money[i] <= 5 ? num1++ : ''
        5 < money[i] && money[i] <= 10 ? num2++ : ''
        10 < money[i] && money[i] <= 15 ? num3++ : ''
        15 < money[i] && money[i] <= 20 ? num4++ : ''
        20 < money[i] && money[i] <= 25 ? num5++ : ''
        25 < money[i] && money[i] <= 30 ? num6++ : ''
        30 < money[i] ? num7++ : ''

      }
      // console.log(num2);
      var option = {
        title: {
          // text: '拉钩网数据来源',
          // subtext: '武汉市前端',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['1-5k', '6-10k', '11-15k', '16-20k', '21-25k', '26-30k', '>30k'],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['60%', '50%'],
          data: [{
            value: num1,
            name: '1-5k'
          },
          {
            value: num2,
            name: '6-10k'
          },
          {
            value: num3,
            name: '11-15k'
          },
          {
            value: num4,
            name: '16-20k'
          },
          {
            value: num5,
            name: '21-25k'
          },
          {
            value: num6,
            name: '26-30k'
          },
          {
            value: num7,
            name: '>30k'
          }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.9)'
            }
          }
        }]
      }
      myChart.setOption(option);
    })

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 折线图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
  fetch('http://localhost:3000/data').then(res => res.json())
    .then(res => {
      let background = []
      res.forEach(item => {
        if (item.positionID) {
          background.push(item.background.split('/')[0])
        }
      });

      var count = background.reduce(function (all, name) {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;

      }, {});

      // console.log(count);
      let dataName = []
      let data1 = []
      let data2 = []
      for (i in count) {
        dataName.push(i)
        data1.push(count[i])
      }
      console.log(dataName);
      // console.log(data1); 
      let num1 = []
      let num2 = []
      let num3 = []
      let num4 = []
      let num5 = []
      let num6 = []
      res.forEach(item => {
        let name = item.background.split('/')[0]
        let a = parseInt(item.money_min.split('k').join(''))
        let b = parseInt(item.money_max.split('k').join(''))
        let c = Math.ceil((a + b) / 2)
        name === dataName[0] ? num1.push(c) : ''
        name === dataName[1] ? num2.push(c) : ''
        name === dataName[2] ? num3.push(c) : ''
        name === dataName[3] ? num4.push(c) : ''
        name === dataName[4] ? num5.push(c) : ''
        name === dataName[5] ? num6.push(c) : ''
      })

      function avg(nums) {
        var num = 0
        for (var j = 0; j < nums.length; j++) {
          num += nums[j]
          var ave = Math.ceil(num / nums.length)
        }
        return ave
      }

      data2.push(avg(num1), avg(num2), avg(num3), avg(num4), avg(num5), avg(num6))
      console.log(data2);

      option = {
        grid: {
          top: "14%",
          bottom: "10%" //也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        legend: {
          data: ["入职平均薪资", "工作经验要求"],
          top: "0%",
          textStyle: {
            color: "#ffffff"
          }
        },
        xAxis: {
          data: dataName,
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: '#00CD66'
            }
          },
          axisTick: {
            show: true //隐藏X轴刻度
          },
          axisLabel: {
            interval: 1,
            show: true,
            textStyle: {
              color: "#ebf8ac" //X轴文字颜色
            },

          },

        },
        yAxis: [{
          type: "value",
          name: "份",
          nameTextStyle: {
            color: "#ebf8ac"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF'
            }
          },
          axisLabel: {

            show: true,
            textStyle: {
              color: "#ebf8ac"
            }
          },

        },
        {
          type: "value",
          name: "k",
          nameTextStyle: {
            color: "#ebf8ac"
          },
          position: "right",
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            formatter: "{value} ", //右侧Y轴文字显示
            textStyle: {
              color: "#ebf8ac"
            }
          }
        },
        {
          type: "value",
          gridIndex: 0,
          min: 50,
          max: 100,
          splitNumber: 8,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
            }
          }
        }
        ],
        series: [{
          name: "入职平均薪资",
          type: "line",
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: true, //平滑曲线显示
          showAllSymbol: true, //显示所有图形。
          symbol: "circle", //标记的图形为实心圆
          symbolSize: 10, //标记的大小
          itemStyle: {
            //折线拐点标志的样式
            color: "#058cff"
          },
          lineStyle: {
            color: "#058cff"
          },
          areaStyle: {
            color: "rgba(5,140,255, 0.2)"
          },
          data: data2
        },
        {
          name: "工作经验要求",
          type: "bar",
          barWidth: 15,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#00FFE3"
              },
              {
                offset: 1,
                color: "#4693EC"
              }
              ])
            }
          },
          data: data1
        }
        ]
      };
      myChart.setOption(option)
    })

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 学历要求饼形图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  fetch('http://localhost:3000/data').then(res => res.json())
    .then(res => {
      let background = []
      // console.log(res);
      res.forEach(item => {
        if (item.title) {
          background.push(item.background.split('/')[1])
        }
      });
      // console.log(background);
      var count = background.reduce(function (all, name) {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;

      }, {});
      console.log(count);

      let data = []
      let titlename = []
      for (i in count) {
        data.push(count[i])
        titlename.push(i)

      }
      var colorList = ["#065aab", "#ff0000", "#0682ab", "#06c8ab"]
      option = {
        title: {
          text: '学历要求',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['45%', '65%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 15,
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            rich: {
              hr: {
                backgroundColor: 't',
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
              },
              a: {
                padding: [-30, 15, -20, 15]
              }
            }
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 30,
              lineStyle: {
                width: 1
              }
            }
          },
          data: [{
            'name': titlename[0],
            'value': data[0]
          }, {
            'name': titlename[1],
            'value': data[1]
          }, {
            'name': titlename[2],
            'value': data[2]
          }, {
            'name': titlename[3],
            'value': data[3]
          }],
        }]
      }
      myChart.setOption(option);
    })

  // 使用刚指定的配置项和数据显示图表。

  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 经验要求分析
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".bar1 .chart"));

  fetch('http://localhost:3000/data').then(res => res.json())
    .then(res => {
      let background = []
      // console.log(res);
      res.forEach(item => {
        if (item.title) {
          background.push(item.background.split('/')[0])
        }
      });
      // console.log(background);

      var count = background.reduce(function (all, name) {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;

      }, {});
      // console.log(count);

      let data = []
      let titlename = []
      for (i in count) {
        data.push(count[i])
        titlename.push(i)
      }
      let num = []
      for (var i = 0; i < data.length; i++) {
        num.push(background.length)
      }

      var valdata = num
      var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6", "red"];
      option = {
        //图标位置
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%"
        },
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: titlename,
          inverse: true,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",

            rich: {
              lg: {
                backgroundColor: "#339911",
                color: "#fff",
                borderRadius: 10,
                // padding: 5,
                align: "center",
                width: 15,
                height: 15
              }
            }
          }
        },
        {
          show: true,
          inverse: true,
          data: valdata,
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: "#fff"
            }
          }
        }
        ],
        series: [{
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: data,
          barCategoryGap: 50,
          barWidth: 20,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: "inside",
              formatter: "{c}"
            }
          }
        },
        {
          name: "框",
          type: "bar",
          yAxisIndex: 1,
          barCategoryGap: 50,
          data: 150,
          barWidth: 20,
          itemStyle: {
            normal: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 10
            }
          }
        }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 柱状图-技能掌握
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line1 .chart"));

  fetch('http://localhost:3000/data').then(res => res.json())
    .then(res => {
      let tags = []
      res.forEach(item => {
        if (item.positionID) {
          let arr = item.tag.split(' ')
          for (i in arr) {
            tags.push(arr[i])
          }
        }
      });
      let arr = []
      tags.forEach(item => {
        if (item === 'HTML' || item === 'HTML5' || item === 'Javascript' ||
          item === 'CSS' || item === 'Angularjs' || item === 'Vue' ||
          item === 'Node.js' || item === 'native') {
          arr.push(item)
        }
      })
      console.log(arr);

      var count = arr.reduce(function (all, name) {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;

      }, {});
      console.log(count);
      let value = []
      let name = []
      for (i in count) {
        value.push(count[i])
        name.push(i)
      }
      console.log(name);
      console.log(value);
      var myColor = ['#eb2100', '#eb3600', '#d0a00e', '#34da62', '#00e9db', '#00c0e9',
        '#0096f3', '#33CCFF',
      ];
      option = {
        // backgroundColor: '#0e2147',
        grid: {
          left: '10%',
          top: '3%',
          right: '0%',
          bottom: '-8%',
          containLabel: true
        },
        xAxis: [{
          show: false,
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            }
          },
          data: name
        }, {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12',
            }
          },
          data: ['8', '7', '6', '5', '4', '3', '2', '1']
        }, {
          name: '分拨延误TOP 10',
          nameGap: '50',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '12',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [],
        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: value,
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#ffffff',
                fontSize: '12',
              }
            }
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          z: 2
        }, {
          name: '白框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5,],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#0e2147',
              barBorderRadius: 5,
            }
          },
          z: 1
        }, {
          name: '外框',
          type: 'bar',
          yAxisIndex: 2,
          barGap: '-100%',
          data: [100, 100, 100, 100, 100, 100, 100, 100],
          barWidth: 24,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
              barBorderRadius: 5,
            }
          },
          z: 0
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0, 0, 0, 0],
          yAxisIndex: 2,
          symbolSize: 20,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
              opacity: 1,
            }
          },
          z: 2
        }
        ]
      };
      myChart.setOption(option)
    })
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 地区分布统计模块
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie1  .chart"));
  $.get('http://localhost:3000/json', function (redata) {
    fetch('http://localhost:3000/data').then(res => res.json()).then(res => {

      let datas = JSON.parse(redata).content.positionResult.result

      for (var i = 0; i < res.length; i++) {
        if (res[i].positionID) {
          res[i].name = datas[i].district
        }
      }
      let address = [] //存储地区名
      res.forEach(item => {
        if (item.title) {
          address.push(item.name)
        }
      })

      //计算各地区的重复值
      var count = address.reduce(function (all, name) {
        if (name in all) {
          all[name]++;
        } else {
          all[name] = 1;
        }
        return all;

      }, {});
      console.log(count);


      let addressName = []
      let value = []
      for (i in count) {
        addressName.push(i)
        value.push(count[i])
      }

      // let results = []
      // for (var i = 0; i < addressName.length; i++) {
      //   let result = {}
      //   result.name = addressName[i],
      //     result.value = value[i]
      //   results.push(result)

      // }
      // console.log(results);

      let data = {
        xData: addressName,
        yData: value
      }

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: [{
          top: '10%',
          bottom: '10%'
        },
        {
          height: 60,
          bottom: 40
        }
        ],
        xAxis: [{
          type: 'category',
          data: data.xData,
          gridIndex: 0,
          axisLabel: {
            color: '#fff',
            interval: 0,
            formatter: function (value) {
              return value.split("").join("\n");
            },
          },
          axisLine: {
            lineStyle: {
              color: '#e7e7e7'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#e7e7e7'
            }
          },
          zlevel: 2
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#fff'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          data: data.yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: (params) => {
                let colors = ['#4150d8', '#28bf7e', '#ed7c2f', '#f2a93b', '#f9cf36', '#4a5bdc', '#4cd698', '#f4914e', '#fcb75b', '#ffe180', '#b6c2ff', '#96edc1',]
                return colors[params.dataIndex]
              }
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0

        }]
      };

      // 3. 配置项和数据给我们的实例化对象
      myChart.setOption(option);


    })
  })

  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();

//地理散点图
(function () {
  var myChart = echarts.init(document.querySelector('.map'));
  $.get('http://localhost:3000/json', function (data) {
    fetch('http://localhost:3000/data').then(res => res.json()).then(res => {

      let datas = JSON.parse(data).content.positionResult.result
      // console.log(datas);
      datas.forEach(item => {
        item.value = [
          Number(item.longitude),
          Number(item.latitude)
        ]
        item.name = item.companyShortName

      })

      for (var i = 0; i < res.length; i++) {
        res[i].value = datas[i].value
        // console.log(res[i].value);
      }
      res.forEach(item => {
        if (item.positionID) {
          item.value.push(item.money_min.split('k').join(''))
        }

      })
      // console.log(res[1]);


      myChart.setOption(option = {
        bmap: {
          // 百度地图中心经纬度
          center: [114.31, 30.52],
          // 百度地图缩放
          zoom: 10,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {
            styleJson: [{
              "featureType": "land",
              "elementType": "all",
              "stylers": {
                "color": "#0a1c5c"
              }
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": {
                "color": "#073763",
                "lightness": -54
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                // 'color': '#ffffff',
                "color": "#073763",
                // "lightness":-62,
              }
            },
            {
              'featureType': 'arterial',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#555555'
              }
            },
            {
              "featureType": "highway",
              "elementType": "all",
              "stylers": {
                "color": "#45818e",
                'visibility': 'off'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {
                'visibility': 'off'
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -70
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#857f7f'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.stroke',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              "featureType": "boundary",
              "elementType": "all",
              "stylers": {
                "color": "#ffffff",
                "lightness": -62,
                "visibility": "on"
              }
            },
            {
              'featureType': 'green',
              'elementType': 'geometry',
              'stylers': {
                'color': '#062032'
              }
            },
            {
              'featureType': 'local',
              'elementType': 'geometry',
              'stylers': {
                'color': '#000000'
              }
            },
            {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#022338'
              }
            },
            {
              "featureType": "label",
              "elementType": "labels.text.fill",
              "stylers": {
                "color": "#ffffff",
                "visibility": "on"
              }
            },
            {
              "featureType": "label",
              "elementType": "labels.text.stroke",
              "stylers": {
                "color": "#444444",
                "visibility": "off"
              }
            },
            {
              "featureType": "medical",
              "elementType": "all",
              "stylers": {
                "visibility": "off"
              }
            }
            ]
          }
        },
        visualMap: {
          type: 'piecewise',

          pieces: [{
            min: 1,
            max: 5
          },
          {
            min: 6,
            max: 8
          },
          {
            min: 9,
            max: 12
          },
          {
            min: 13,
            max: 15
          },
          {
            min: 16,
            max: 19
          },
          {
            min: 20,
            max: 23
          },
          {
            min: 24,
            max: 27
          },
          {
            min: 28,
            max: 30
          },
          {
            min: 31,

          }
          ],
          calculable: true,
          itemWidth: 24,
          itemHeight: 12,
          left: 20,
          top: 20,
          inverse: true,
          hoverLink: false,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d', 'darkred']
          },
          outOfRange: {
            symbolSize: 0
          },
          textStyle: {
            color: '#fff'
          },
          formatter(a, b) {
            if (a < 0) return '面议';
            if (b > 50) return '超高薪';
            return `${a} - ${b}K`;
          },
        },
        series: [{
          type: 'scatter',
          // 使用百度地图坐标系
          coordinateSystem: 'bmap',
          // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
          data: res,
          symbolSize: 15,
          label: {
            emphasis: {
              show: true,
              formatter: function (param) {
                return param.name;
              },
              position: 'right',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white'
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowOffsetY: 0,
            }
          }
        }],
        tooltip: {
          // trigger: 'item',
          triggerOn: 'click',
          padding: [10, 20, 10, 20],
          backgroundColor: 'rgba(144,152,160,0.7)',
          borderColor: '#ccc',
          borderWidth: 2,
          borderRadius: 4,
          transitionDuration: 1,
          extraCssText: 'width: 320px;',
          textStyle: {
            fontSize: 14
          },
          position: {
            right: 60,
            top: 100
          },
          enterable: true,
          hideDelay: 1000,
          formatter(params) {
            let data = params.data;

            let template = '';
            const makeTemplate = (key, value) => {
              template += `<li><span>${key}</span>：${value}</li>`;
            };
            makeTemplate('名称', data.companyName);
            makeTemplate('规模', data.industry);
            makeTemplate('职位', data.title);
            makeTemplate('年限', data.background);
            makeTemplate('薪资', data.money_min + '-' + data.money_max);
            // makeTemplate('市区', data.city + ' ' + data.area);
            makeTemplate('发布时间', data.time);
            makeTemplate('公司链接',
              `<a target="_blank" href="${data.companyLink}">点击跳转</a>`
            );
            makeTemplate('招聘链接',
              `<a target="_blank" href="${data.jdLink}">点击跳转</a>`
            );
            template = `<ul class="template">${template}</ul>`;
            return template;
          }
        },

      })

      var bmap = myChart.getModel().getComponent('bmap').getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    })
  })
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})()