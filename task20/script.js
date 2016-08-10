/**
 * Created by solam on 2016/8/9.
 */
var data = [];
//using ascii code to distinct mark and strings.
function inputHandle(input) {
    var newData = [];
    var string = '';
    var count = 0;
    input = input.concat(' ');
    for (var i = 0; i < input.length; i ++) {
        var judge = input[i].charCodeAt();
        if ((judge > 47 && judge < 58) || (judge > 64 && judge < 91) ||
            (judge > 96 && judge < 123)) {
            string = string.concat(input[i]);
        } else {
            newData[count] = string;
            count ++;
            string = '';
        }
    }
    return newData;
}
function deleteFunc(id) {
    for (var i = id - 1; i < data.length; i++) {
        data[i - i] = data[i];
    }
    data.pop();
}
function searchData() {
    var key = document.getElementById('searchInput');
    var keyValue = key.value;
    for (var i = 0; i < data.length; i++) {
        var result = data[i].search(keyValue);
        if (result >= 0) {
            var mark = 'data'.concat(i.toString());
            document.getElementById(mark).style.backgroundColor = 'yellow';
        }
    }
}

function renderImg() {
    var img = '';
    for (var i = 0; i < data.length; i ++) {
        img += '<div id=\"data'+ i + '\" onclick=\"deleteFunc(this.id)\">' + data[i] + '</div>';
    }
    document.getElementById('chart').innerHTML = img;
}

function leftIn() {
    var input = document.getElementById('input');
    var inputText = input.value;
    var newData = inputHandle(inputText);
    data = newData.concat(data);
    renderImg();
}
function rightIn() {
    var input = document.getElementById('input');
    var inputText = input.value;
    var newData = inputHandle(inputText);
    data = data.concat(newData);
    renderImg();
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