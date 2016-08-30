/**
 * Created by solame on 2016/8/3.
 */
var data = [];
var sortData = [];

function renderChart(array, area) {
    //html part
    var i, id, tall;
    var chart = '';
    for (i = 0; i < array.length; i ++) {
        id = area + i.toString();
        chart += '<div id=\"' + id + '\"></div>';
    }
    document.getElementById(area).innerHTML = chart;
    for (i = 0; i < array.length; i ++) {
        tall = array[i].toString().concat('px');
        id = area + i.toString();
        document.getElementById(id).style.height = tall;
    }
}
function deleteFunc(id) {
    for (var i = id - 1; i < data.length; i++) {
        data[i - i] = data[i];
    }
    data.pop();
}
function sort(input) {
    for (var i = sortData.length - 1; i >= 0; i--) {
        if (input <= sortData[i]) {
            sortData[i + 1] = sortData[i];
        } else {
            sortData[i + 1] = input;
            break;
        }
    }
}
function inputJudge(inputValue) {
    if (Number.isInteger(inputValue) === false) {
        alert("Please enter integer! ")
    } else if (inputValue < 10 || inputValue > 100){
        alert("Please enter integer between 10 and 100!")
    } else if (data.length > 60) {
        alert("There has been 60 elements in the array!")
    } else {
        return true;
    }
    return false;
}
function renderImg(input) {
    renderChart(data, 'chart');
    if (data.length > 1)
        sort(input);
    else
        sortData[0] = data[0];
    renderChart(sortData, 'sortChart');
}

//button input handlers
function leftIn() {
    var input = document.getElementById('numIn');
    var inputValue = Number(input.value);
    if (inputJudge(inputValue) === true){
        if (data.length !== 0) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i + 1] = data[i];
            }
            data[0] = inputValue;
        } else {
            data[0] = inputValue;
        }
        renderImg(inputValue);
    }
    input.value = null;
}

function rightIn() {
    var input = document.getElementById('numIn');
    var inputValue = Number(input.value);
    if (inputJudge(inputValue) === true) {
        data[data.length] = inputValue;
        renderImg(inputValue);
    }
    input.value = null;
}

function leftOut() {
    var del = data.shift();
    alert(del);
    renderImg();
}

function rightOut() {
    var del = data.pop();
    alert(del);
    renderImg();
}

