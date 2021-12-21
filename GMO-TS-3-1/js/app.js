var render1 = document.querySelector('.content-message-2');
var render2 = document.querySelector('.content-message');
var input2 = document.getElementById('content-send-2');
var input1 = document.getElementById('content-send');
var bold1 = document.getElementById('dam');
var bold2 = document.getElementById('dam-2');
var italic1 = document.getElementById('nghieng');
var italic2 = document.getElementById('nghieng-2');
var style = 'normal';
// Xử lý chữ đậm
function handleBold(btnBold, btnItalic, input) {
    var isChooseBold = btnBold.classList.toggle('choose');
    input.style.fontStyle = "normal";
    if (isChooseBold) {
        btnItalic.classList.remove('choose');
        input.style.fontWeight = "bold";
        style = 'bold';
    }
    else {
        input.style.fontWeight = "normal";
        style = 'normal';
    }
}
//xử lý chữ nghiêng
function handleItalic(btnBold, btnItalic, input) {
    var isChooseItalic = btnItalic.classList.toggle('choose');
    input.style.fontWeight = "normal";
    if (isChooseItalic) {
        btnBold.classList.remove('choose');
        input.style.fontStyle = 'italic';
        style = 'italic';
    }
    else {
        input.style.fontStyle = "normal";
        style = 'normal';
    }
}
// Xử lý click send
function handleClickSend(input, senderElement, receiverElement, dam, italic) {
    var value = input.value;
    var node1 = document.createElement("LI");
    node1.classList.add("mes", "sender", style);
    var textNode1 = document.createTextNode(value);
    node1.appendChild(textNode1);
    receiverElement.appendChild(node1);
    var node2 = document.createElement("LI");
    node2.classList.add("mes", "receiver", style);
    var textNode2 = document.createTextNode(value);
    node2.appendChild(textNode2);
    senderElement.appendChild(node2);
    handleClear(input, dam, italic);
}
// xử lý khi nhấn reset
function handleClear(input, btnBold, btnItalic) {
    input.value = '';
    input.style.fontStyle = 'normal';
    input.style.fontWeight = 'normal';
    btnBold.className = '';
    btnItalic.className = '';
    style = 'normal';
}
// Xử lý send bên phải
function clickSend2() {
    handleClickSend(input2, render2, render1, bold2, italic2);
}
// Xử lý send bên trái
function clickSend() {
    handleClickSend(input1, render1, render2, bold1, italic1);
}
// Xử lý reset bên trái
function reset() {
    handleClear(input1, bold1, italic1);
    render2.innerHTML = '';
}
// Xử lý reset bên phải
function reset2() {
    handleClear(input2, bold2, italic2);
    render1.innerHTML = '';
}
// Xử lý đậm bên trái
function handleBoldOne() {
    handleBold(bold1, italic1, input1);
}
// Xử lý nghiêng bên trái
function handleItalicOne() {
    handleItalic(bold1, italic1, input1);
}
// Xử lý đậm bên phải
function handleBoldTwo() {
    handleBold(bold2, italic2, input2);
}
// Xử lý nghiêng bên phải
function handleItalicTwo() {
    handleItalic(bold2, italic2, input2);
}
// Nhấn enter để send
window.addEventListener('keydown', click);
function click(e) {
    if (e.keyCode == 13) {
        clickSend();
        clickSend2();
    }
}
