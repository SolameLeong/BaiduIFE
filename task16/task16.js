/**
 * Created by solam on 2016/7/21.
 */
/**
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
    var cityIn = document.getElementById("aqi-city-input").value.trim();
    var aqiIn = document.getElementById("aqi-value-input").value.trim();
    //console.log(Boolean(aqiIn));

    if (isNaN(cityIn) === false) {
        window.alert("请在城市一栏中填入汉字或英语。");
    } else if (Boolean(aqiIn) === false || isNaN(aqiIn) === true) {
        window.alert("请在空气质量一栏中填入纯数字。");
    } else {
        aqiData[cityIn] = aqiIn;
        renderAqiList();
    }
    //console.log(aqiData);
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var key in aqiData) {
        console.log(key);
        table += "<tr><td>" + key + "</td><td>" + aqiData[key] +
            "</td><td><button id=\"" + key +
            "\" onclick='delBtnHandle(\"" + key + "\")' class='del'>删除</button></td>";
    }
    document.getElementById("aqi-table").innerHTML = table;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(clicked) {
    console.log(clicked, aqiData[clicked], aqiData);
    delete aqiData[clicked];

    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = addBtnHandle;
}

window.onload = init;