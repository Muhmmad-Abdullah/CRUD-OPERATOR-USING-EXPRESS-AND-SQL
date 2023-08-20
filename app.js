var connection = require('./connection');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send("Welcome to the CRUD OPERATOR");
});
app.get('/employee', function (req, res) {
    connection.query("SELECT * FROM employee", function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(rows);
        }
    });
});
app.get('/employee/:id', function (req, res) {
    connection.query("SELECT * FROM employee WHERE id=?", [req.params.id], function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(rows);
        }
    });
});
app.delete('/employee/:id', function (req, res) {
    connection.query("DELETE FROM employee WHERE id=?", [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.post('/employee', function (req, res) {
    var emp = req.body;
    connection.query("INSERT INTO employee (id, name, email, position) VALUES (?, ?, ?, ?)", [emp.id, emp.name, emp.email, emp.position], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.patch('/employee/:id', function (req, res) {
    var emp = req.body;
    connection.query("UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?", [emp.name, emp.email, emp.position, req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.put('/employee/:id', function (req, res) {
    var emp = req.body;
    connection.query("UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?", [emp.name, emp.email, emp.position, req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
var port = 3000;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
