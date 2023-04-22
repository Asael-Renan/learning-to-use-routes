const url = "PUT YOUR URL HERE" //example: http://localhost:3000

async function getUsers() {
    const response = await fetch(`${url}/users`);
    const data = await response.json();
    for (user of data) {
        addUserInTable(user.id, user.name, user.email);
    }
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    createUserByButton()
});

function createUserByButton() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    if (!name == '' && !email == '') {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email })
        };

        fetch(`${url}/users`, requestOptions)
            .then(response => {
                response.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error));
        window.location.reload()
    } else {
        alert("por favor, digite algo no formulario")
    }
}

function addUserInTable(id, name, email) {
    let table = document.getElementById('table').innerHTML
    table += `<tr>
      <td id="idUser">${id}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>
          <button class="btn" style="background-color: rgb(236, 236, 79); color: black;">editar</button>
          <button class="btn" onclick="deleteUser(${id})">deletar</button>
      </td>
    </tr>`;
    document.getElementById('table').innerHTML = table;
}

async function deleteUser(id) {
    fetch(url + '/users/' + id, { method: 'DELETE' }).then(() => window.location.reload())
}

getUsers();
