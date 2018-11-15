//global elements


var request = new XMLHttpRequest();

// templates
var card_temp = document.querySelector('.js-catCard-template');
var bagItem_temp = document.querySelector('.js-shopingBag-template');

//DOM-elements
var plate = document.querySelector('.cats_plate');
var moreCats = document.querySelector('.js-addCat');
var cartCount = document.querySelector('.js-cats-in-bag');
var bag = document.querySelector('#shoping-bag');
var bagWindow = document.querySelector('.js-shopping-cart');

var closeBag = document.querySelector('.close-btn');

//array for cats cards bg
var bgColors = ['#FED6BC', '#FFFADD', '#DEF7FE', '#E7ECFF', '#C3FBD8', '#FDEED9', '#B5F2EA', '#C6D8FF', '#d3e8ff'];
// array for shopping bag items
var catsInBag = [];

//counts
var page = 1;
var catsCount = 1;


var catsCountWord = document.querySelector('.js');


//main function for receiving data from the server and ...


function addFromServer() {
	request.open('GET', 'https://ma-cats-api.herokuapp.com/api/cats?page=' + (page++) + '&per_page=50', true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {

			var resp = JSON.parse(request.responseText);
			var catsData = resp.cats;
			// ... creating cats cards
			createCatCard(catsData);
			contentHeight = document.querySelector('body').offsetHeight;
		} else {

			alert('ты не нравишься котикам, уходи!');
		}
	};

	request.send();
}


//creating cards for cats and...
function createCatCard(data) {
	for (let i = 0; i < data.length; i++) {
		let card = document.importNode(card_temp.content, true);
		let card_price = card.querySelector('.js-price');
		card_price.innerHTML = data[i].price;

		let cat = card.querySelector('.cats-card');
		let img = card.querySelector('.js-img');
		let card_cartBtn = card.querySelector('.js-cart');

		// ... listener for bag btn in header
		card_cartBtn.addEventListener('click', function () {
			cartCount.innerHTML = catsCount;
			catsCountWord.innerHTML = endings(catsCount, ['котик', 'котика', 'котиков']);
			catsCount++;
		});

		img.setAttribute('src', data[i].img_url);
		let randomBackgroundIndex = randomInteger(0, 8);
		cat.style.background = bgColors[randomBackgroundIndex];
		// ... card info for shopping bag
		card_cartBtn.addEventListener('click', function () {
			let catForCart = {};
			catForCart.price = data[i].price;
			catForCart.src = data[i].img_url;
			let clone = Object.assign({}, catForCart);
			catsInBag.push(clone);
			addToCart(catsInBag);
		});
		plate.appendChild(card);
	}
}
//creating bag item

function addToCart(data) {
	for (let i = 0; i < data.length; i++) {
		var bagItem = document.importNode(bagItem_temp.content, true);
		let delBtn = bagItem.querySelector('.item-delete');
		// delete item onclick
		delBtn.addEventListener('click', function(){
			this.parentNode.remove();
		})
		let bagImg = bagItem.querySelector('.item-img');
		bagImg.setAttribute('src', data[i].src);
	
		let plus = bagItem.querySelector('.plus-btn');
		let input = bagItem.querySelector('.input');
		let minus = bagItem.querySelector('.minus-btn');
		let total = bagItem.querySelector('.total-price');
		total.innerHTML = data[i].price;
	}
	bagWindow.appendChild(bagItem);
}






//secondary functions for ...

// ... 1. Random Number for cats cards background.
function randomInteger(min, max) {
	var randomNumber = Math.random() * (max - min);
	return Math.round(randomNumber);
}

// ... 2. ending for nouns in bag btn
function endings(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}






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
	if (window.pageYOffset > (contentHeight - 500)) {
		addFromServer();
		page++;
	}
};
//listeners

bag.addEventListener('click', function () {
	document.querySelector('.bag').classList.toggle('closed')
});


closeBag.addEventListener('click', function () {
	document.querySelector('.bag').classList.add('closed')
});
