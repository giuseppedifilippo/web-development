const fs = require('fs')
const express = require('express')
var bodyParser = require('body-parser')

let rawUsers = fs.readFileSync('users.json')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

let registredUsers = JSON.parse(rawUsers)

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000

function updateFile() {
    fs.writeFileSync("users.json", JSON.stringify(registredUsers))
}


function getUsers(res) {
    res.json(registredUsers);
}

function getUser(res, id) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato")
    } else {
        res.json(registredUsers[id])
    }

}

function deleteUser(res, id) {
    registredUsers.splice(id, 1);
    updateFile()
}

//----------------search------------//

function searchUser(res,s) {
    let result = registredUsers.filter((user) => user.name.toLowerCase().includes(s));
    res.json(result);
}
app.get("/search", function(req, res) {
    s = req.query.s;
    searchUser(res,s);
})

function addUser(res, user) {
    if (user.name !== undefined && user.password !== undefined) {
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
    }

    registredUsers.push(user);
    updateFile();
    res.status(201).send(user);
}

function loginUser(res, body) {
    if (body.email === undefined) {
        res.status(400).send("Email Mancante");
        return;
    }
    if (body.password === undefined) {
        res.status(400).send("Password Mancante");
        return;
    }

    let loggedUser = registredUsers.findIndex(
        (user) => user.email == body.email && user.password == body.password
    );
    if (loggedUser === -1) {
        res.status(401).send("Login Errata");
        return;

    } else {
        res.json({ id: loggedUser });
        return;
    }
}

function getUserFav(res, id) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato")
    } else {
        res.json(registredUsers[id].film_preferiti)
    }
}





app.post("/users", function (req, res) {
    /* #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
            schema: { $ref: "#/components/schemas/userSchema" },
            }
        }
    }
}
*/
    addUser(res, req.body)
    console.log(registredUsers)
})

app.get("/users", function (req, res) {
    getUsers(res)
})

app.get("/users/:id", function (req, res) {
    let id = req.params.id
    getUser(res, id)
})

app.delete('/users/:id', function (req, res) {
    let id = req.params.id
    deleteUser(res, id)
    res.send("OK")
})

//Preferiti
//------------aggiunta attori favoriti-------//
function addUserFav(res, body, id) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato")
    } else {
        if (body.preferito === undefined) {
            res.status(404).send("Film errato")
        } else {
            registredUsers[id].film_preferiti.push(body.preferito)
            res.json(registredUsers[id])
            updateFile()


        }

    }
}
app.post('/users/:id/fav', function (req, res) {
    let id = req.params.id;
    let body = req.body;
    addUserFav(res, body, id);
})
//----------------------------------//
app.get('/users/:id/fav', function (req, res) {
    let id = req.params.id;
    getUserFav(res, id);
})



//----------------cancella film preferiti--------//
function deleteUserFav(res, id, movie) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato");
    } else {
        fav_index = registredUsers[id].film_preferiti.findIndex((item) => item == movie)
        if (fav_index == -1) {
            res.status(404).send("Preferito non trovato");
        } else {
            registredUsers[id].film_preferiti.splice(fav_index, 1);
            res.send(registredUsers[id])
            updateFile()
        }

    }
}

app.delete('/users/:id/fav/:movie', function (req, res) {
    let id = req.params.id;
    let movie = req.params.movie;
    deleteUserFav(res, id, movie);

})
//---------------------------------//


app.post('/login', function (req, res) {
    let body = req.body;
    loginUser(res, body);
})

//---------------aggiunta attori favoriti ------------//

function addFavActor(res,id, body) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato")
    } else {
        if (body.preferito === undefined) {
            res.status(404).send("Attore errato")
        } else {
            registredUsers[id].attori_preferiti.push(body.attore_preferito)
            res.json(registredUsers[id])
            updateFile()


        }

    }
}
app.post('/user/:id/fav_actor/:nome', function(req,res){
    addFavActor(res, req.params.id, req.params.nome )
})
//--------------------------------------//

//---------------rimozione attori favoriti-------------//

function delUserFavActor(req, id, body) {
    if (registredUsers[id] === undefined) {
        res.status(404).send("Id errato");
    } else {
        fav_index = registredUsers[id].attori_preferiti.findIndex((item) => item == movie)
        if (fav_index == -1) {
            res.status(404).send("Attore preferito non trovato");
        } else {
            registredUsers[id].attori_preferiti.splice(fav_index, 1);
            res.send(registredUsers[id])
            updateFile()
        }

    }
}

app.delete('/user/:id/fav_actor/:nome', function(req,res) {
    let id = req.params.id;
    let body = req.params.body
    delUserFavActor(req, id, body)
})
app.listen(port, '0.0.0.0', () => {
    console.log(`PWM porta in ascolto: ${port}`)
})

//TERMINARE LO SWAGGER E AGGIUNGERE LE API PER ATTORI PREFERITI 
//E REPLICARE LA STESSA GESTIONE DEI FILM PREFERITI PER GLI ATTORI