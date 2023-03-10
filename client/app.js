const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();

let userName;

const login = (e) => {
	e.preventDefault();
	if (!userNameInput.value) {
		alert('Must not be empty !');
	} else {
		userName = userNameInput.value;
		socket.emit('userName', userName);
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
	}
};
const sendMessage = (e) => {
	e.preventDefault();
	if (!messageContentInput.value) {
		alert('You must write the message');
	} else {
		addMessage(userName, messageContentInput.value);
		socket.emit('message', {
			author: userName,
			content: messageContentInput.value,
		});
		messageContentInput.value = '';
	}
};
const addMessage = (author, content) => {
	const message = document.createElement('li');
	message.classList.add('message', 'message--received');
	if (author === userName) {
		message.classList.add('message--self');
	}
	if (author === 'Chat Bot') {
		message.classList.add('message--bot');
	}
	message.innerHTML = ` <h3 class="message__author">${author === userName ? 'You' : author
		}</h3>
    <div class="message__content">${content}</div>
  </li>`;
	messagesList.appendChild(message);
};

socket.on('message', ({ author, content }) => addMessage(author, content));

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);