const express = require('express')
const fs = require('fs')
var bodyparser = require('body-parser')
let rawUsers = fs.readFileSync('users.json')
const app = express()
app.use(express.json())
const port = 3000

let registredUsers = JSON.parse(rawUsers)


function addUser(res, user) {
    if (user.name.length < 3) {
        res.status(400).send('nome corto')
        return;
    }

    registredUsers.push(user);
    return;

}

function updateFile() {

    fs.writeFileSync("users.json", JSON.stringify(registredUsers))
}



app.post("/addUser", function (req, res) {
    console.log(req.body);
    if (addUsers(req.body) == true) {
        res.status(200).send('invio eseguito con successo')
    } else {
        res.status(400).send('campi mancanti')
    }
})


app.listen(port, () => {
    console.log('swaws')
})