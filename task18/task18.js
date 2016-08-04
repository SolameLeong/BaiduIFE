/**
 * Created by solam on 2016/8/3.
 */
//Left input handle
var data = [];

function renderImg() {
    var img = '';
    for (var i = 0; i < data.length; i ++) {
        var id = 'data' + i.toString();
        img += '<div id=\"' + id + '\">' + data[i] + '</div>';
    }
    document.getElementById('chart').innerHTML = img;
}

function leftIn() {
    var input = document.getElementById('numIn').value;
    console.log(input);
    if (data.length !== 0) {
        for (var i = data.length - 1; i >= 0; i--) {
            data[i + 1] = data[i];
        }
    }
    data[0] = input;
    renderImg();
}

function rightIn() {
    data[data.length] = document.getElementById('numIn').value;
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

