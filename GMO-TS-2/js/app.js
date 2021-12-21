var ulElement = document.querySelector('#ol-content');
var cityElement = document.querySelector('#city');
cityElement.onchange = function (e) {
    var value = cityElement.value;
    ulElement.className = '';
    ulElement.classList.add(value);
};
