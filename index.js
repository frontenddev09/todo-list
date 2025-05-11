const formEl = document.querySelector('.form')

const inputEl = document.querySelector('.input')

const ulEl = document.querySelector('.list')

let list = JSON.parse(localStorage.getItem('list'))
if (list) {
	list.forEach(task => {
		toDoList(task)
	})
}

formEl.addEventListener('submit', event => {
	event.preventDefault()
	toDoList()
})

function toDoList(task) {
	let newTask = inputEl.value
	if (task) {
		newTask = task.name
	}

	const liEl = document.createElement('li')
	if (task && task.checked) {
		liEl.classList.add('checked')
	}
	liEl.innerText = newTask
	ulEl.appendChild(liEl)
	inputEl.value = ''

	//Create Edit Button
	const editBtnEl = document.createElement('div')
	editBtnEl.innerHTML = `
        <i class="fa-solid fa-pen">
    `
	liEl.appendChild(editBtnEl)

	if (!liEl.classList.contains('checked')) {
		editBtnEl.addEventListener('click', () => {
			inputEl.value = liEl.innerText

			formEl.addEventListener('submit', event => {
				event.preventDefault()

				liEl.innerText = inputEl.value
				inputEl.value = ''
			})
			liEl.remove()
		})
	}

	//Create Check Button
	const checkBtnEl = document.createElement('div')
	checkBtnEl.innerHTML = `
        <i class="fas fa-check-square">
    `
	liEl.appendChild(checkBtnEl)

	checkBtnEl.addEventListener('click', () => {
		liEl.classList.toggle('checked')
		updateLocalStorage()
	})

	//Create Trash Button
	const trashBtnEl = document.createElement('div')
	trashBtnEl.innerHTML = `
        <i class="fas fa-trash"></i>
    `
	liEl.appendChild(trashBtnEl)

	trashBtnEl.addEventListener('click', () => {
		liEl.remove()
		updateLocalStorage()
	})
	updateLocalStorage()
}

// Update Local Storage
function updateLocalStorage() {
	const liEls = document.querySelectorAll('li')
	list = []
	liEls.forEach(liEl => {
		list.push({
			name: liEl.innerText,
			checked: liEl.classList.contains('checked'),
		})
	})
	localStorage.setItem('list', JSON.stringify(list))
}
