const infoList = []
//Xử lý add 
function showError(key :string, mess : string) : void{
 document.getElementById(key + '_error').innerHTML = mess;
}
function add() {
    const date = new Date()
    var name  = (<any>document.getElementById('name')).value;
    var phone = (<any>document.getElementById('phone')).value;
    var email = (<any>document.getElementById('email')).value;
    var validate = document.querySelector('.validate')
    if (name !== "" && phone !== "" && email !== "") {
        var item = {
            id: `${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`,
            name: name,
            phone: phone,
            email: email,
        }
        validate.innerHTML = ""
        infoList.push(item)
        render();
        clear();
    } else {
        validate.innerHTML = "Vui long nhập các trường này"
      
    }
}
function clear() {
   var clClear : any = document.querySelectorAll(".clear");
   for(var i = 0; i < clClear.length; i++)
    {
       clClear[i].value ="" ;
    }
}
// Xử lý check all
const checkAllElement : any = document.querySelector('.checkAll')
checkAllElement.onclick = function (e) {
    const cb : any = document.querySelectorAll('.checkBoxItem');
    cb.forEach(item  => {
    if (e.target.checked === true) {
            item.checked = true
        } else {
            item.checked = false
        }
        });
   
}
// delete action
function deleteItem(id : number) {
    const dltI = document.querySelectorAll('.deleteItem');
    dltI.forEach(() => {
        infoList.map((item, index) => {
            if (Number(item.id) === id) {
                infoList.splice(index, 1)
            }
        })
        render()
    })
}
// delete 
function remove() {
    checkAllElement.checked = false
    const cb : any = document.querySelectorAll('.checkBoxItem');
    cb.forEach((item) => {
        if (item.checked === true) {
            const indexOfElement = item.parentElement.parentElement.dataset.index
            infoList.map((item, index) => {
                if (Number(item.id) === Number(indexOfElement)) {
                    infoList.splice(index, 1)
                }
            })
            render()
        }
    })
}
function render() {
    const list = infoList.map((item) => {
        return ` <tr data-index="${item.id}">
        <th class="checkbox">
            <input type="checkbox" class="checkBoxItem" name="" value="">
        </th>
        <th class="name" > 
            <input type="text" name="name" readonly ondblclick="dblclick(this)" onblur="handleBlur(this)" value="${item.name}">
        </th>
        <th class="phone"> 
            <input type="number" name="phone" readonly ondblclick="dblclick(this)" onblur="handleBlur(this)" value="${item.phone}">
        </th>
        <th class="email"> 
            <input type="text" name="email" readonly ondblclick="dblclick(this)" onblur="handleBlur(this)" value="${item.email}">
        </th>
        <th class="action"> 
            <button class = "deleteItem" onclick ="deleteItem(${item.id})" > delete</button> 
        </th> 
    </tr>`
    }).join("")
    document.getElementById('render').innerHTML = list;
}

function dblclick(e : any) {
    e.readOnly = false
}

function handleBlur(e : any) {
    e.readOnly = true;
    const id = e.parentElement.parentElement.dataset.index
    infoList.forEach(item => {
        if (Number(item.id) === Number(id)) {
            item[e.name] = e.value
        }
    })
}

 
