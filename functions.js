const Users = require('./db.js')

async function getUsers() {
    const user = await Users.findAll({ raw: true })
    return user
}

async function getUser({ id, name, email, type }) {
    let user;
    if (type == "id") {
        user = await Users.findOne({
            raw: true, where: {
                id: id
            }
        })
    } else if (type == "name") {
        user = await Users.findOne({
            raw: true, where: {
                name: name
            }
        })
    } else if (type == "email") {
        user = await Users.findOne({
            raw: true, where: {
                email: email
            }
        })
    } else { return false }
    return user
}

async function getUsersFrom({ id, name, email, type }) {
    try {
        let users;
        if (type == "id") {
            users = await Users.findAll({
                raw: true,
                where: {
                    id: id
                }
            });
        } else if (type == "name") {
            users = await Users.findAll({
                raw: true,
                where: {
                    name: name
                }
            });
        } else if (type == "email") {
            users = await Users.findAll({
                raw: true,
                where: {
                    email: email
                }
            });
        } else {
            return false;
        }
        console.log(users)
        return users;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return false;
    }
}

async function deleteUser(id) {
    Users.destroy({ where: { id: id } })
        .then(() => {
            console.log('Usuário excluído com sucesso!');
        })
        .catch((erro) => {
            console.error('Erro ao excluir usuário:', erro);
        })
}

function createUser(name, email) {
    Users.create({
        name: name,
        email: email
    })
        .then(value => {
            console.log('usuario criado: ' + value)
            return true
        }).catch(error => {
            console.log('error' + error)
            return false
        })
}

module.exports = { getUsers, createUser, getUser, deleteUser, getUsersFrom }
