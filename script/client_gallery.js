{
const clientGalleryElem = document.querySelector('.client_gallery');
const mediaPath = 'media/';
let clientIndex = 0;

const imgList = ['microsoft.png','microsoft.png','microsoft.png','microsoft.png','microsoft.png',];

const client_container = document.createElement('div');
const client_main = document.createElement('div');
const client_frame = document.createElement('div');
const client_trigger = document.createElement('div');
const client_trigger_left = document.createElement('div');
const client_trigger_right = document.createElement('div');

clientGalleryElem.append(client_container);
client_container.append(client_main);
client_main.append(client_frame, client_trigger);
client_trigger.append(client_trigger_left, client_trigger_right);

client_container.classList.add('client-container');
client_main.classList.add('client-main');
client_trigger.classList.add('client-trigger');
client_frame.classList.add('client-frame');

client_trigger_left.innerHTML = '<';
client_trigger_right.innerHTML = '>';

const clientElem = imgList.map(lst=>{
	const client_width = client_container.offsetWidth;
	const divElem = document.createElement('div');
	divElem.style.width = '280' + 'px';
	divElem.style.backgroundImage = `url('${mediaPath+lst}')`;
	return divElem
});

const clientRender = ()=>{
	const client_width = client_container.offsetWidth;
	if(client_width >= 1000){
		client_frame.style.right = client_width/4 * clientIndex + 'px';
	}else if(client_width < 1000 && client_width > 850){
		client_frame.style.right = client_width/3 * clientIndex + 'px';
	}else if(client_width < 850 && client_width > 600){
		client_frame.style.right = client_width/2 * clientIndex + 'px';
	}else{
		client_frame.style.right = client_width/1 * clientIndex + 'px';
	};
	const liList = document.querySelectorAll('.client-points li');
	liList.forEach(t=>t.classList.remove('activeClient'));
	liList[clientIndex].classList.add('activeClient');
};

const clientResize = ()=>{
	const client_width = client_container.offsetWidth;
	if(client_width >= 1000){
		client_frame.style.width = client_width/4 * imgList.length + 'px';
	}else if(client_width < 1000 && client_width > 850){
		client_frame.style.width = client_width/3 * imgList.length + 'px';
	}else if(client_width < 850 && client_width > 600){
		client_frame.style.width = client_width/2 * imgList.length + 'px';
	}else{
		client_frame.style.width = client_width/1 * imgList.length + 'px';
	};
	clientElem.forEach(elem => elem.style.width = '280' + 'px');
	clientRender();
};

window.addEventListener('resize', clientResize);
client_frame.append(...clientElem);

client_trigger_left.addEventListener('click', ()=>{
	if(clientIndex > 0){
		clientIndex--;
	}else{
		clientIndex = imgList.length - 1;
	};
	clientRender();
});

client_trigger_right.addEventListener('click', ()=>{
	if(imgList.length - 1 > clientIndex){
		clientIndex++;
	}else{
		clientIndex = 0;
	};
	clientRender();
});

const ulClient = document.createElement('ul');
ulClient.classList.add('client-points');

ulClient.append(...imgList.map((_, index)=>{
	const elem = document.createElement('li');
	elem.addEventListener('click', e=>{
		const liElem = e.target;
		const liList = [...liElem.parentNode.children];
		clientIndex = liList.indexOf(liElem);
		clientRender();
	});
	return elem;
}));

client_container.append(ulClient);

clientRender()
clientResize();
}