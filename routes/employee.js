const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
const db_config = require('../database/config');





router.get('/', async function(req, res, next) {
    //returns list of employees
    try {
        const connection = await mysql.createConnection(db_config);

        const [rows, fields] = await connection.execute('SELECT * FROM Employee');
        connection.end();

        if (rows.length < 1) {
             res.status(404).json({message: 'No Employee record!'})
        }
        else {
            res.send({message: 'success', employees: rows});
        }

    }catch (e) {
        res.status(500).json({Error: e.message, Trace: e.stack});
    }

});



router.get('/:id', async function (req, res, next) {
    //returns employee by id
    try {
        const connection = await mysql.createConnection(db_config);

        const [rows, fields] = await connection.execute('SELECT * FROM Employee WHERE employee_id = ?', [req.params.id]);

        const [rows2, fields2] = await connection.execute('SELECT * FROM Job_History LEFT JOIN Departments ON Job_History.department_id = Departments.department_id AND Job_History.employee_id = ?', [req.params.id]);

        connection.end();
        if (rows.length < 1) {

            res.status(404).json({message: `No Employee with id: ${req.params.id} found!`})
        }
        else {
            let employee_data = {
                info: rows[0],
                job_history: rows2
            };
            res.send({message: 'success', employee: employee_data});
        }

    }catch (e) {
        res.status(500).json({Error: e.message, Trace: e.stack});
    }
});

module.exports = router;
