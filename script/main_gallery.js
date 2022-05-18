{
const galleryElem = document.querySelector('.head_main')
const mediaPath = 'media/';
let imgIndex = 0;

const list = [
	{
		text: 'Бухгалтерские услуги в Санкт-Петербурге',
		img: 'background1.png'
	},
	{
		text: 'Бухгалтерские услуги в Санкт-Петербурге',
		img: 'background2.png'
	},
	{
		text: 'Бухгалтерские услуги в Санкт-Петербурге',
		img: 'background3.png'
	},
	{
		text: 'Бухгалтерские услуги в Санкт-Петербурге',
		img: 'background4.png'
	}
];

const slider_container = document.createElement('div');
const slider_main = document.createElement('div');
const slider_frame = document.createElement('div');
const slider_trigger = document.createElement('div');
const slider_trigger_left = document.createElement('div');
const slider_trigger_right = document.createElement('div');

galleryElem.append(slider_container);
slider_container.append(slider_main);
slider_main.append(slider_frame, slider_trigger);
slider_trigger.append(slider_trigger_left, slider_trigger_right);

slider_container.classList.add('slider-container');
slider_main.classList.add('slider-main');
slider_frame.classList.add('slider-frame');
slider_trigger.classList.add('slider-trigger');

slider_trigger_left.innerHTML = '<'
slider_trigger_right.innerHTML = '>'

const frameElem = list.map(obj=>{
	const slider_width = slider_container.offsetWidth;
	const divElem = document.createElement('div');
	divElem.style.width = slider_width + 'px';
	divElem.style.backgroundImage = `url('${mediaPath+obj.img}')`;
	const h1Elem = document.createElement('h1');
	const btnElem = document.createElement('button');
	const contentElem = document.createElement('div');
	h1Elem.classList.add('h1-header');
	btnElem.classList.add('btn-header');
	contentElem.classList.add('content-header');
	contentElem.append(h1Elem, btnElem);
	divElem.append(contentElem)
	h1Elem.innerText = obj.text;
	btnElem.innerText = 'Наша презентация'
	return divElem
});

const render = ()=>{
	const slider_width = slider_container.offsetWidth;
	slider_frame.style.right = slider_width * imgIndex  + 'px';
	const liList = document.querySelectorAll('.slider-points li');
	liList.forEach(t=>t.classList.remove('active'));
	liList[imgIndex].classList.add('active');
};

const resize = ()=>{
	const slider_width = slider_container.offsetWidth;
	slider_frame.style.width = slider_width * list.length + 'px';
	frameElem.forEach(elem => elem.style.width = slider_width + 'px');
	render();
};

window.addEventListener('resize', resize);
slider_frame.append(...frameElem);

slider_trigger_left.addEventListener('click', ()=>{
	if(imgIndex > 0){
		imgIndex--
	}else{
		imgIndex = list.length-1
	};
	render();
});

slider_trigger_right.addEventListener('click', ()=>{
	if(list.length - 1 > imgIndex){
		imgIndex++;
	}else{
		imgIndex = 0;
	};
	render();
});

const ulElem = document.createElement('ul');
ulElem.classList.add('slider-points');

ulElem.append(...list.map((_, index)=>{
	const elem = document.createElement('li');
	elem.addEventListener('click', e=>{
		const liElem = e.target;
		const liList = [...liElem.parentNode.children];
		imgIndex = liList.indexOf(liElem);
		render()
	});
	return elem
}))

slider_container.append(ulElem);

render();
resize();
}

