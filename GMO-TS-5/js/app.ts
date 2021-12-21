const score : any = document.getElementById('score');
const countdowntimer : any = document.getElementById('countdowntimer')
var scoreCount : number = 0;
const qaAnsRow : any = document.querySelectorAll('.qa_ans_row input')

//Xử lý countdown
var time : any = 30; // Set time
var saved_countdown = localStorage.getItem('saved_countdown');
if (saved_countdown == null) {
  var new_countdown : any = new Date().getTime() + (time + 2) * 1000;
  time  = new_countdown;
  localStorage.setItem('saved_countdown', new_countdown );
} else {
  time  = saved_countdown;
}
// Update the count down every 1 second
var downloadTimer = setInterval(() => {
  var now = new Date().getTime();
  var distance = time - now;
  // Time counter
  var counter = Math.floor((distance % (1000 * 60)) / 1000);
  //Show html
  countdowntimer.innerHTML = counter + " s";
  // Nếu time <=0 thì break
  if (counter <= 0) {
    clearInterval(downloadTimer)
    localStorage.removeItem('saved_countdown');
    score.innerHTML = scoreCount;
    document.getElementById("da1").innerHTML = " A , B"
    document.getElementById("da2").innerHTML = " B"
    document.getElementById("da3").innerHTML = " C"
    document.getElementById("da4").innerHTML = " D"
    localStorage.removeItem('s_item');
    //xử lý cộng điểm 
    
    qaAnsRow.forEach(item => {
      const valid  = item.getAttribute("valid");
      if (item.checked === true && valid === "valid") {
        scoreCount += 25;
        score.innerHTML = scoreCount;
      }
      if (item.checked === true && valid !== "valid") {
        item.nextElementSibling.classList.add("error")
      }
    });
  }
}, 1000);

// check giữ lại khi load trang 
document.addEventListener("DOMContentLoaded", function () {
  var checkbox : any = document.querySelectorAll("input[type='checkbox']");
  for (var item of checkbox) {
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
    for (var item  of checkbox) { 
       // đánh dấu true trong cá id đã tồn tại trong local
       item.checked = localStorage.s_item.indexOf(item.id + ",") != -1 ? true : false; 
    }
  }
});
