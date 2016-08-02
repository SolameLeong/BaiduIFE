/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

/**
 * 初始化图表需要的数据格式
 */

function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    function dayCalculator(){
        chartData['day'] = aqiSourceData;
    }

    function weekCalculator() {
        chartData['week'] = {};
        for (var city in aqiSourceData) {
            var i = 0, sum = 0, weekCount = 1;
            var week = 'week';
            chartData['week'][city] = {};
            for (var date in aqiSourceData[city]){
                if (i < 7) {
                    sum += aqiSourceData[city][date];
                    i ++;
                } else {
                    week = week.concat(weekCount.toString());
                    var ave = sum / 7;
                    chartData['week'][city][week] = ave;
                    i = 0;
                    sum = 0;
                    weekCount ++;
                }
            }
        }
    }
    function monthCalculator() {
        chartData['month'] = {};
        for (var city in aqiSourceData) {
            var i = 0, sum = 0;
            var month = '01';
            chartData['month'][city] = {};
            for (var date in aqiSourceData[city]) {
                var today = city.slice(5, 8);
                if (today === month) {
                    sum += aqiSourceData[city][date];
                    i ++;
                } else {
                    var ave = sum / i;
                    chartData['month'][city][month] = ave;
                    i = 0;
                    sum = 0;
                }
            }
        }
    }
    dayCalculator();
    weekCalculator();
    monthCalculator();
}

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(time, city) {
    var img = document.getElementById('aqi-chart-wrap').innerHTML;
    var data = chartData[time][city];
    var chart = document.getElementsByClassName('chart');
    var count = 0;
    for (var key in chartData[time][city]) {
        img += '<div class=\"chart\" id = \"' + key + '\"></div>';
        count ++;
    }

    //style setting
    var keys = Object.keys(chartData[time][city]);
    console.log(keys);
    for (var i = 0; i < count; i ++) {
        if (data <= 50){
            chart[i].style.backgroundColor = 'green';
        } else if (data <= 100) {
            chart[i].style.backgroundColor = 'yellow';
        } else if (data <= 150) {
            chart[i].style.backgroundColor = 'red';
        } else if (data <= 200) {
            chart[i].style.backgroundColor = 'purple';
        } else {
            chart[i].style.backgroundColor = 'black';
        }
        console.log(chartData[time][city][keys[i]]);
        chart[i].style.height = chartData[time][city][keys[i]];
    }

    if (time === 'day') {
        chart.style.width = '2px';
    } else if (time === 'week') {
        chart.style.width = '4px';
    } else {
        chart.style.width = '8px';
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
var timeShow = 'day';
function graTimeChange(input) {
    // 确定是否选项发生了变化
    if (input !== timeShow) {
        timeShow = input;
    }
    // 设置对应数据
    var opt = document.getElementById('city-select');
    var city = opt.options[opt.selectedIndex].value;
    // 调用图表渲染函数
    renderChart(city, timeShow);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var opt = document.getElementById('city-select');
    var city = opt.options[opt.selectedIndex].value;
    // 设置对应数据
    var timeOpt = document.getElementsByName('gra-time');
    for (var i = 0; i < timeOpt.length; i++) {
        if (timeOpt[i].checked === true) {
            var time = timeOpt[i].value;
            break;
        }
    }
    // 调用图表渲染函数
    renderChart(city, time);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
//function initGraTimeForm() {

//}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var option = '';
    for (var key in aqiSourceData) {
        option += '<option value=\"'+key+'\">' + key + '</option>';
    }
    document.getElementById('city-select').innerHTML = option;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
}


/**
 * 初始化函数
 */
function init() {
    //initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;