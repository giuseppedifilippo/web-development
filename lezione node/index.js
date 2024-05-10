const fs = require('fs')
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


var bodyParser = require('body-parser')

let rawUsers = fs.readFileSync('users.json')

let registredUsers = JSON.parse(rawUsers)

const app = express()
app.use(express.json())
const port = 3000
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


function updateFile() {
    fs.writeFileSync("users.json", JSON.stringify(registredUsers))
}

function addUser(res, user) {

    if (user.name.length < 3) {
        res.status(400).send("Nome troppo corto o mancante")
        return;
    }
    if (user.surname.length < 3) {
        res.status(400).send("Cognome troppo corto o mancante")
        return;
    }
    if (user.password.length < 8) {
        res.status(400).send("Password troppo corta o mancante")
        return;
    }

    registredUsers.push(user);
    updateFile();
    res.status(201).send(user);
    //aggiornare il file
}
function getUsers(res) {
    res.json(registredUsers);
}

function getUser(res, id) {
    res.json(registredUsers[id])
}


app.get('/users', function (req, res) {
    getUsers(res)
})

app.get("/users/:id", function (req, res) {
    let id = req.params.id
    getUser(res, id)
})

function deleteUsers(res,id) {
    registredUsers.splice(id,1);
    updateFile()
}
app.delete('/users/:id', function(req, res) {
    let id = req.params.id;
    
})
//  ------------------mostra favoriti------------------ //
function getFav(res, id){
    
    res.json(registredUsers[id].film_preferiti)
}

app.get("/users/:id/fav", function (req, res) {
    let fav_id = req.params.id
    getFav(res, fav_id)
})

//--------------------------------------------//

//----------------aggiungi favoriti ---------------//
function addFav(res, id, body) {
    registredUsers[id].film_preferiti.push(body.preferito);
    updateFile();
}

app.post("/users/:id/fav/", function(req, res, body) {
    let id = req.params.id;
    addFav(res, id, req.body)
})

//-----------------------------------------------//

app.post("/users", function (req, res) {
    addUser(res, req.body)
    console.log(registredUsers)
})


//------------------login----------------//
function loginUser(res, body) {
    if (body.email == undefined){
        res.status(400).send("mail mancante");
    }

    let loggedUser = registredUsers.find((user) => user.email == body.email && user.password == body.password)
}


app.post('/login', function(req,res) {
    let body = req.body;

})





app.listen(port, () => {
    console.log(`PWM porta in ascolto: ${port}`)
})