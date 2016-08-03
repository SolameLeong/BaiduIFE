/**
 * Created by solam on 2016/8/3.
 */
//Left input handle
var data = [];

function renderImg() {
    var img = '';
    for (var i = 0; i < data.length; i ++) {
        var iden = 'data' + i.toString();
        img += '<div id=\"' + iden + '\">' + data[i] + '</div>';
    }
    document.write(img);
}

function leftIn() {
    var input = document.getElementById('leftIn').value;
    if (data.length !== 0) {
        for (var i = data.length - 1; i >= 0; i--) {
            data[i + 1] = data[i];
        }
    }
    data[0] = input;
    renderImg();
}

function rightIn() {
    data[data.length] = document.getElementById('rightIn').value;
    renderImg();
}

function leftOut() {
    alert(data[0]);
    delete data[0];
    renderImg();
}

function rightOut() {
    alert(data[data.length - 1]);
    delete data[data.length - 1];
}
