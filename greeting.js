const nameForm = document.querySelector(".js-nameForm"),
 input = nameForm.querySelector(".nameInput"),
 greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
	SHOWING_CN = "showing";

function saveName(text){
	localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = input.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askForName(){
	nameForm.classList.add(SHOWING_CN);
	nameForm.addEventListener("submit",handleSubmit)
}

function paintGreeting(text){
	nameForm.classList.remove(SHOWING_CN);
	greeting.classList.add(SHOWING_CN);
	greeting.innerText = `Hello ${text}`;
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		askForName();
	} else {
		paintGreeting(currentUser);
	}
}

function init(){
	loadName();
}

init();