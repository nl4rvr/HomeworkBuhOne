const feedbackgalleryElem = document.querySelector('.feedbackGallery');
const mediaPath = 'media/';
let feedbackIndex = 0
const feebackList = [
	{
		text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. ',
		img: 'avatar.png',
		name: 'Екатерина Иванова',
		company: 'Директор ООО “Раз-два”'
	},
	{
		text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. ',
		img: 'avatar.png',
		name: 'Екатерина Иванова',
		company: 'Директор ООО “Раз-два”'
	},
	{
		text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. ',
		img: 'avatar.png',
		name: 'Екатерина Иванова',
		company: 'Директор ООО “Раз-два”'
	},
	{
		text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. ',
		img: 'avatar.png',
		name: 'Екатерина Иванова',
		company: 'Директор ООО “Раз-два”'
	}
];

const feedback_main = document.createElement('div');
const feedback_container = document.createElement('div');
const feedback_frame = document.createElement('div');
const feedback_trigger = document.createElement('div');
const feedback_trigger_left = document.createElement('div');
const feedback_trigger_right = document.createElement('div');

feedbackgalleryElem.append(feedback_container);
feedback_container.append(feedback_main);
feedback_main.append(feedback_frame, feedback_trigger);
feedback_trigger.append(feedback_trigger_left, feedback_trigger_right);

feedback_container.classList.add('feedback-container');
feedback_main.classList.add('feedback-main');
feedback_frame.classList.add('feedback-frame');
feedback_trigger.classList.add('feedback-trigger');

feedback_trigger_left.innerHTML = '<';
feedback_trigger_right.innerHTML = '>';

const feedbackElem = feebackList.map(obj=>{
	const feedback_width = feedback_container.offsetWidth;
	const divElem = document.createElement('div');
	divElem.style.width = feedback_width + 'px';
	divElem.style.backgroundColor = `#EBEBEB`;

	const contentElem = document.createElement('div');
	const pElem = document.createElement('p');
	const elem = document.createElement('div');
	const img = document.createElement('div');
	const text = document.createElement('div');
	const name = document.createElement('p');
	const company = document.createElement('p');


	pElem.innerText = obj.text;
	img.style.backgroundImage = `url('${mediaPath+obj.img}')`;
	name.innerText = obj.name;
	company.innerText = obj.company;
	
	contentElem.classList.add('content-feedback')
	pElem.classList.add('p-feedback');
	elem.classList.add('human');
	img.classList.add('img');
	text.classList.add('text');
	name.classList.add('name');
	company.classList.add('company');

	text.append(name, company);
	elem.append(img, text);
	contentElem.append(pElem, elem);
	divElem.append(contentElem);
	return divElem;
});

const feedbackRender = ()=>{
	const feedback_width = feedback_container.offsetWidth;
	feedback_frame.style.right = feedback_width * feedbackIndex + 'px';
	const liList = document.querySelectorAll('.feedback-points li');
	liList.forEach(t=>t.classList.remove('active'));
	liList[feedbackIndex].classList.add('active');
};

const feedbackResize = ()=>{
	const feedback_width = feedback_container.offsetWidth;
	feedback_frame.style.width = feedback_width * feebackList.length + 'px';
	feedbackElem.forEach(elem => elem.style.width = feedback_width + 'px');
	feedbackRender();
};

window.addEventListener('resize', feedbackResize);

feedback_frame.append(...feedbackElem);

feedback_trigger_left.addEventListener('click', ()=>{
	if(feedbackIndex > 0){
		feedbackIndex--;
	}else{
		feedbackIndex = feebackList.length-1;
	};
	feedbackRender();
});

feedback_trigger_right.addEventListener('click', ()=>{
	if(feebackList.length - 1 > feedbackIndex){
		feedbackIndex++;
	}else{
		feedbackIndex = 0;
	};
	feedbackRender();
});

const ulFeedback = document.createElement('ul');
ulFeedback.classList.add('feedback-points');
ulFeedback.append(...feebackList.map((_, index)=>{
	const elem = document.createElement('li');
	elem.addEventListener('click', e=>{
		const liElem = e.target;
		const liList = [...liElem.parentNode.children];
		feedbackIndex = liList.indexOf(liElem);
		feedbackRender();
	});
	return elem;
}));

feedback_container.append(ulFeedback);

feedbackRender();
feedbackResize();
