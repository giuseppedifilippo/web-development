const fs = require('fs')
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb');
var cors = require('cors');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


let rawUsers = fs.readFileSync('users.json');
let registredUsers = JSON.parse(rawUsers);

const uri = "mongodb+srv://valeriobellandi:valerio@cluster0.1mshosh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;

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

function addUser(res, user) {
    if (user.name !== undefined && user.surname !== undefined && user.password !== undefined) {
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
    } else {
        res.status(400).send("Campi assenti")
        return;
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

function searchUser(res,s){
    let filtredUsers = registredUsers.filter((user) => user.name.toLowerCase().includes(s));
    res.json(filtredUsers)
}

app.post("/users", function (req, res) {
    addUser(res, req.body)
    console.log(registredUsers)
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/userSchema" },
                }
            }
        }
    */
})

app.get("/users", async function (req, res) {
    //getUsers(res)
    const pwmClient = await client.connect();
    var users = await pwmClient.db("PWM").collection("Users").find().toArray();
    await client.close();
    console.log(users)
    res.json(users)

})

app.get("/users/:id", async function (req, res) {
    const pwmClient = await client.connect();
    var users = await pwmClient.db("PWM").collection("Users").find({_id:ObjectId(id)}).toArray();
    await client.close();
    console.log(users)
    res.json(users)
})

app.delete('/users/:id', function (req, res) {
    let id = req.params.id
    deleteUser(res, id)
    res.send("OK")
})

//Preferiti

app.get('/users/:id/fav', function (req, res) {
    let id = req.params.id;
    getUserFav(res, id);
})

app.post('/users/:id/fav', function (req, res) {
    let id = req.params.id;
    let body = req.body;
    addUserFav(res, body, id);
})

app.delete('/users/:id/fav/:movie', function (req, res) {
    let id = req.params.id;
    let movie = req.params.movie;
    deleteUserFav(res, id, movie);

})
// Login

app.post('/login', async function (req, res) {
    let body = req.body;
    loginUser(res, body);
    const = pwmClient
})

app.listen(port, '0.0.0.0', () => {
    console.log(`PWM porta in ascolto: ${port}`)
})
// Search

app.get("/search", function(req,res){
    s = req.query.s;
    searchUser(res,s)
})
