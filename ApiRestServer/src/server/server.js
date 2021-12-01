const express = require('express');
//Cors nos permite compartir datos dentro del mismo servidor
const cors = require('cors');
const { query } = require('../config/db.js');
const app = express();
app.disable('x-powered-by');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    //permite el control de acceso al origen, permite compartir recursos dentro del mismo servidor
app.use(cors());

let server;
const runServer = () => {
    // Initialize the server
    server = app.listen(8002, () => {
        console.log(
            `Server started at port http://localhost:${server.address().port}`
            );
    })
}

const stopServer = () => {
    console.log('Closing out remaining connection');
    server.close();
}
/*
* Rutas de Nuestra API 
*/

app.get('/api/v1/actors', async(req, res) => {
    try {
        const sql = "SELECT * FROM actores";
        const result = await query(sql);
        let message = '';
        if(result === undefined || result.length === 0) {
            message = 'Actores table is empty';
        }else{
            message = 'Successfully retrieved all actors';
        }

        res.send({ 
            error: false,
            data: result,
            message: message
        })
    } catch (error) {
        console.log(error);
        res.resStatus(500);
    }
})


// Get actor by id
app.get('/api/v1/actor/:id', async(req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(400).send({ 
            error: true,
            message: 'Actor id is needed',

        })
    }
    try {
        const sql = "SELECT * FROM actores WHERE actor_id = ?";
        const result = await query(sql, [id]);
        let message = '';
        
        if(result === undefined || result.length === 0) {
            message = 'Actor is not found';
        }else{
            message = 'Successfully retrieved actor data';
        }

        res.send({
            error: false,
            data: result[0],
            message: message
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

// Add new actor
app.post('/api/v1/actor', async(req, res) => {
    console.log(req.body);
    const { first_name, last_name } = req.body;

    if(!first_name || !last_name) {
        return res.status(400).send({
            error: true,
            message: 'provide actor first_name and last_name'
        })
    }

    try {
        const sql = 'INSERT INTO actores (first_name, last_name) VALUES (?,?)';
        const result = await query(sql, [first_name, last_name])

        res.send({
            error: false,
            data: {insert_id: result.insert_id},
            message: 'Actor successfully added with id ' + result.insert_id
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//Update actor by id
app.put('/api/v1/actor/:id', async(req, res) => {
    console.log(req.body);
    const { first_name, last_name } = req.body;
    const { id } = req.params;

    if(!id || !first_name || !last_name) {
        return res.status(400).send({
            error: true,
            message: 'provide actor id, first_name and last_name'
        })
    }

    try {
        const sql = 'UPDATE actores SET first_name=?, last_name=? WHERE actor_id=?';
        const result = await query(sql, [first_name, last_name, id])

        let message = '';
        if(result.changedRows == 0){
            message = 'Actor not found or data are same';
        }else{
            message = 'Actor successfully updated';
        }
        res.send({
            error: false,
            data: {chandedRows: result.chandedRows},
            message: message
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

//Delete actor by id
app.delete('/api/v1/actor/:id', async(req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(400).send({ 
            error: true,
            message: 'provide actor id',

        })
    }
    try {
        const sql = "DELETE FROM actores WHERE actor_id = ?";
        const result = await query(sql, [id]);
        let message = '';
        
        if(result.affectedRows === 0) {
            message = 'Actor is not found';
        }else{
            message = 'Actor successfully delete';
        }

        res.send({
            error: false,
            data: {affectedRows: result.affectedRows},
            message: message
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = { runServer, stopServer };
