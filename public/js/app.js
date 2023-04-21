async function getUsers() {
    const response = await fetch(' https://2a0b-179-251-109-169.ngrok-free.app/users');
    const data = await response.json();
    for (user of data) {
        addUserInTable(user.id, user.name, user.email);
    }
}

async function filterUsers() {
    try {
        const options = document.getElementById('opcoes').value
        const input = document.getElementById('filter').value
        let values;

        if (options === 'id' && !isNaN(input)) {
            values = {
                type: options,
                id: input
            }
        } else if (options === 'name') {
            values = {
                type: options,
                name: input
            }
        } else if (options === 'email') {
            values = {
                type: options,
                email: input
            }
        } else { alert("Por favor, informe um valor valido") }

        const queryString = JSON.stringify(values)
        console.log(queryString)

        const response = await fetch(' https://2a0b-179-251-109-169.ngrok-free.app/users' + JSON.stringify(queryString));
        const data = await response.json();
        for (user of data) {
            addUserInTable(user.id, user.name, user.email);
        }
    } catch(error) {
        alert('algo deu errado ' + error)
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

        fetch(' https://2a0b-179-251-109-169.ngrok-free.app/users', requestOptions)
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
    fetch(' https://2a0b-179-251-109-169.ngrok-free.app/users/' + id, { method: 'DELETE' }).then(() => window.location.reload())
}

getUsers();
