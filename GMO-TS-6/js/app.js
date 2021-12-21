var infoList = [];
//Xử lý add 
function showError(key, mess) {
    document.getElementById(key + '_error').innerHTML = mess;
}
function add() {
    var date = new Date();
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var validate = document.querySelector('.validate');
    if (name !== "" && phone !== "" && email !== "") {
        var item = {
            id: "".concat(date.getHours()).concat(date.getMinutes()).concat(date.getMilliseconds()),
            name: name,
            phone: phone,
            email: email
        };
        validate.innerHTML = "";
        infoList.push(item);
        render();
        clear();
    }
    else {
        validate.innerHTML = "Vui long nhập các trường này";
    }
}
function clear() {
    var clClear = document.querySelectorAll(".clear");
    for (var i = 0; i < clClear.length; i++) {
        clClear[i].value = "";
    }
}
// Xử lý check all
var checkAllElement = document.querySelector('.checkAll');
checkAllElement.onclick = function (e) {
    var cb = document.querySelectorAll('.checkBoxItem');
    cb.forEach(function (item) {
        if (e.target.checked === true) {
            item.checked = true;
        }
        else {
            item.checked = false;
        }
    });
};
// delete action
function deleteItem(id) {
    var dltI = document.querySelectorAll('.deleteItem');
    dltI.forEach(function () {
        infoList.map(function (item, index) {
            if (Number(item.id) === id) {
                infoList.splice(index, 1);
            }
        });
        render();
    });
}
// delete 
function remove() {
    checkAllElement.checked = false;
    var cb = document.querySelectorAll('.checkBoxItem');
    cb.forEach(function (item) {
        if (item.checked === true) {
            var indexOfElement_1 = item.parentElement.parentElement.dataset.index;
            infoList.map(function (item, index) {
                if (Number(item.id) === Number(indexOfElement_1)) {
                    infoList.splice(index, 1);
                }
            });
            render();
        }
    });
}
function render() {
    var list = infoList.map(function (item) {
        return " <tr data-index=\"".concat(item.id, "\">\n        <th class=\"checkbox\">\n            <input type=\"checkbox\" class=\"checkBoxItem\" name=\"\" value=\"\">\n        </th>\n        <th class=\"name\" > \n            <input type=\"text\" name=\"name\" readonly ondblclick=\"dblclick(this)\" onblur=\"handleBlur(this)\" value=\"").concat(item.name, "\">\n        </th>\n        <th class=\"phone\"> \n            <input type=\"number\" name=\"phone\" readonly ondblclick=\"dblclick(this)\" onblur=\"handleBlur(this)\" value=\"").concat(item.phone, "\">\n        </th>\n        <th class=\"email\"> \n            <input type=\"text\" name=\"email\" readonly ondblclick=\"dblclick(this)\" onblur=\"handleBlur(this)\" value=\"").concat(item.email, "\">\n        </th>\n        <th class=\"action\"> \n            <button class = \"deleteItem\" onclick =\"deleteItem(").concat(item.id, ")\" > delete</button> \n        </th> \n    </tr>");
    }).join("");
    document.getElementById('render').innerHTML = list;
}
function dblclick(e) {
    e.readOnly = false;
}
function handleBlur(e) {
    e.readOnly = true;
    var id = e.parentElement.parentElement.dataset.index;
    infoList.forEach(function (item) {
        if (Number(item.id) === Number(id)) {
            item[e.name] = e.value;
        }
    });
}
