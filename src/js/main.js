//глобальные
var temp = document.querySelector('#cat-template');
var plate = document.querySelector('.cats_plate');
var moreCats = document.querySelector('.js-addCat');
var cartCount = document.querySelector('.js-cats-in-bag');
var catsCountWord = document.querySelector('.js');
var request = new XMLHttpRequest();
var page = 1;
var catsCount = 1;
var bag = document.querySelector('#shoping-bag');
var bagWindow = document.querySelector('.js-shopping-cart');



var closeBag = document.querySelector('.close-btn');
	closeBag.addEventListener('click', function(){
		document.querySelector('.bag').classList.add('closed')});
//получение данных от сервера

function addFromServer() {
	request.open('GET', 'https://ma-cats-api.herokuapp.com/api/cats?page=' + (page++) + '&per_page=50', true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {

			var resp = JSON.parse(request.responseText);
			var catsData = resp.cats;
			// и создание  котиков
			createCat(catsData);
			contentHeight = document.querySelector('body').offsetHeight;
		} else {

			alert('ты не нравишься котикам, уходи!');
		}
	};

	request.send();
}


// функция для получения рандомного числа
function randomInteger(min, max) {
	var rand = min + Math.random() * (max - min)
	rand = Math.round(rand);
	return rand;
}

//массив с цветами для котиков
var bgColors = ['#FED6BC', '#FFFADD', '#DEF7FE', '#E7ECFF', '#C3FBD8', '#FDEED9', '#B5F2EA', '#C6D8FF', '#d3e8ff'];
// определение окончания для корзины
function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
 


var catsToBuy = [];
var catForCart={};
//создание карточки для котиков
function createCat(data) {
	for (let i = 0; i < data.length; i++) {
		var card = document.importNode(temp.content, true);
		var price = card.querySelector('.js-price');
		var cat = card.querySelector('.cats-card');
		var img = card.querySelector('.js-img');
		var cart = card.querySelector('.js-cart');
		cart.addEventListener('click', function () {
			cartCount.innerHTML = catsCount;
			catsCountWord.innerHTML = declOfNum(catsCount, ['котик', 'котика', 'котиков']);
			catsCount++;
		});
//		cart.addEventListener('click', addTocart);

		price.innerHTML = data[i].price;
		img.setAttribute('src', data[i].img_url);
		var randomBackground = randomInteger(0, 8);
		cat.style.background = bgColors[randomBackground];
			cart.addEventListener('click', function(){
			catForCart.price = data[i].price;
			catForCart.src = data[i].img_url;
				let clone = Object.assign({}, catForCart);
			catsToBuy.push(clone);
				console.log(catsToBuy);
				addTocart(catsToBuy);
		});
		plate.appendChild(card);
	}
}

function addTocart(data){
	for(let i=0; i<data.length; i++){
	var item=document.importNode(document.querySelector('#shoping-bag-temp').content, true);
	var del = item.querySelector('.item-delete');
	var bagImg = item.querySelector('.item-img');
	bagImg.setAttribute('src', data[i].src);
	var plus = item.querySelector('.plus-btn');
	var input = item.querySelector('.input');
	var minus = item.querySelector('.minus-btn');
	var total = item.querySelector('.total-price');
		total.innerHTML = data[i].price;
	}
		bagWindow.appendChild(item);
}
//закрыть корзину

	

//добавить при загрузке
window.onload = addFromServer();

//добавить при клике
moreCats.addEventListener('click', addFromServer);

//добавить при скролле
var contentHeight = document.querySelector('body').offsetHeight;

window.onscroll = scroll;


function scroll() {
	//	 var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	//  document.getElementById('showScroll').innerHTML = scrolled + 'px';
	if (window.pageYOffset > (contentHeight-500)) {
		addFromServer();
		page++;
	}
};


bag.addEventListener('click', function(){
document.querySelector('.bag').classList.toggle('closed')});