var score = document.getElementById('score');
var countdowntimer = document.getElementById('countdowntimer');
var scoreCount = 0;
var qaAnsRow = document.querySelectorAll('.qa_ans_row input');
//Xử lý countdown
var time = 30; // Set time
var saved_countdown = localStorage.getItem('saved_countdown');
if (saved_countdown == null) {
    var new_countdown = new Date().getTime() + (time + 2) * 1000;
    time = new_countdown;
    localStorage.setItem('saved_countdown', new_countdown);
}
else {
    time = saved_countdown;
}
// Update the count down every 1 second
var downloadTimer = setInterval(function () {
    var now = new Date().getTime();
    var distance = time - now;
    // Time counter
    var counter = Math.floor((distance % (1000 * 60)) / 1000);
    //Show html
    countdowntimer.innerHTML = counter + " s";
    // Nếu time <=0 thì break
    if (counter <= 0) {
        clearInterval(downloadTimer);
        localStorage.removeItem('saved_countdown');
        score.innerHTML = scoreCount;
        document.getElementById("da1").innerHTML = " A , B";
        document.getElementById("da2").innerHTML = " B";
        document.getElementById("da3").innerHTML = " C";
        document.getElementById("da4").innerHTML = " D";
        localStorage.removeItem('s_item');
        //xử lý cộng điểm 
        qaAnsRow.forEach(function (item) {
            var valid = item.getAttribute("valid");
            if (item.checked === true && valid === "valid") {
                scoreCount += 25;
                score.innerHTML = scoreCount;
            }
            if (item.checked === true && valid !== "valid") {
                item.nextElementSibling.classList.add("error");
            }
        });
    }
}, 1000);
// check giữ lại khi load trang 
document.addEventListener("DOMContentLoaded", function () {
    var checkbox = document.querySelectorAll("input[type='checkbox']");
    for (var _i = 0, checkbox_1 = checkbox; _i < checkbox_1.length; _i++) {
        var item = checkbox_1[_i];
        item.addEventListener("click", function () {
            // kiểm tra xem có trong local
            localStorage.s_item ?
                // Kiểm tra local có chứa id 
                localStorage.s_item = localStorage.s_item.indexOf(this.id + ",") == -1
                    // không tồn tại thêm id trong local
                    ? localStorage.s_item + this.id + ","
                    // đã tồn tại xóa khỏi local
                    : localStorage.s_item.replace(this.id + ",", "") :
                // không tồn tại tạo id checkbox
                localStorage.s_item = this.id + ",";
        });
    }
    // tồn tại trong localStorage
    if (localStorage.s_item) {
        // tồn tại trong checkbox
        for (var _a = 0, checkbox_2 = checkbox; _a < checkbox_2.length; _a++) {
            var item = checkbox_2[_a];
            // đánh dấu true trong cá id đã tồn tại trong local
            item.checked = localStorage.s_item.indexOf(item.id + ",") != -1 ? true : false;
        }
    }
});
