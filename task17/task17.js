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

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(data) {
    //html part
    var area = document.getElementById('aqi-chart-wrap');
    var chart = '', aqi;
    for (var key in data) {
        chart += '<div id=\"' + key + '\"></div>';
    }
    area.innerHTML = chart;
    for (key in data) {
        aqi = data[key].toString().concat('px');
        document.getElementById(key).style.height = aqi;
    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var options = document.getElementsByName('gra-time');
    for (var i = 0; i < options.length; i ++) {
        if (options[i].checked) {
            timeSpan = options[i].value;
            break;
        }
    }
    if (timeSpan !== pageState.nowGraTime) {
        // 设置对应数据
        pageState.nowGraTime = timeSpan;
        var chart = chartData[timeSpan][pageState.nowSelectCity];
        // 调用图表渲染函数
        renderChart(chart);
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(s) {
    // 确定是否选项发生了变化
    var city = s[s.selectedIndex].id;
    if (city !== pageState.nowSelectCity) {
        pageState.nowSelectCity = city;
        // 设置对应数据
        var chart = chartData[pageState.nowGraTime][city];
        // 调用图表渲染函数
        renderChart(chart);
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var options = document.getElementsByName('gra-time');
    for (var i = 0; i < options.length; i ++) {
        options[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city = Object.keys(aqiSourceData);
    var option = '<option></option>';
    for (var i = 0; i < city.length; i ++) {
        option += '<option id=\"' + city[i] + '\">' + city[i] + '</option>';
    }
    document.getElementById('city-select').innerHTML = option;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var city, date, check, sum, key, count, month, daysCount;
    //daily data
    chartData.day = aqiSourceData;
    //weekly data;
    chartData.week = {};
    for (city in aqiSourceData) {
        check = 0;
        sum = 0;
        count = 0
        chartData['week'][city] = {};
        for (date in aqiSourceData[city]) {
            if (check < 7) {
                sum += aqiSourceData[city][date];
                check ++;
            } else {
                sum = Math.ceil(sum / 7);
                key = 'week'.concat(count.toString());
                chartData['week'][city][key] = sum;
                check = 0;
                sum = 0;
                count ++;
            }
        }
        sum = Math.ceil(sum / 7);
        key = 'week'.concat(count.toString());
        chartData['week'][city][key] = sum;
    }
    //monthly data
    chartData.month = {};
    var monthName = ['January', 'February', 'March', 'April', 'May', 'June'];
    for (city in aqiSourceData) {
        sum = 0;
        daysCount = 0;
        count = 0;
        month = '01';
        chartData['month'][city] = {};
        for (date in aqiSourceData[city]) {
            check = date.substr(5, 2);
            if (month === check) {
                sum += aqiSourceData[city][date];
                daysCount ++;
            } else {
                month = check;
                sum = Math.ceil(sum / daysCount);
                console.log(sum);
                key = monthName[count];
                chartData['month'][city][key] = sum;
                count ++;
                sum = 0;
                daysCount = 0;
            }
        }
        sum = Math.ceil(sum / daysCount);
        key = monthName[count];
        chartData['month'][city][key] = sum;
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;