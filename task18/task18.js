/**
 * Created by solam on 2016/8/3.
 */
var data = [];

function renderImg() {
    var img = '';
    for (var i = 0; i < data.length; i ++) {
        var id = 'data' + i.toString();
        img += '<div id=\"' + id + '\" onclick=\"deleteFunc(this.id)\">' + data[i] + '</div>';
    }
    document.getElementById('chart').innerHTML = img;
}
function deleteFunc(id) {
    for (var i = id - 1; i < data.length; i++) {
        data[i - i] = data[i];
    }
    data.pop();
}


function leftIn() {
    var input = document.getElementById('numIn');
    var inputValue = Number(input.value);
    if (Number.isInteger(inputValue) === true) {
        if (data.length !== 0) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i + 1] = data[i];
            }
            data[0] = inputValue;
        } else {
            data[0] = inputValue;
        }
        renderImg();
    } else {
        alert('Please enter integer!')
    }
    input.value = null;
}

function rightIn() {
    var input = document.getElementById('numIn');
    var inputValue = Number(input.value);
    if (Number.isInteger(inputValue) === true) {
        data[data.length] = inputValue;
        renderImg();
    } else {
        alert('Please enter integer!');
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

