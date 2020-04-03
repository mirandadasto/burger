const express = require("express");
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger");

router.get('/', function (request, response) {
    burger.selectAll(function(data)
    {
        var hdbrsObj = {
            burgers: data
        };
        console.log(hdbrsObj);
        response.render("index", hdbrsObj);
    });
});

router.post('/api/burgers', function (request, response) {
    burger.insertOne(
        ["burger_name", "devoured"], 
        [request.body.burger_name, request.body.devoured], 
        function(result)
        {
            response.json({ id: result.insertId });
        });
});

router.put('/api/burgers/:id', function (request, response) {
    var condition = "id = " + request.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {
            devoured: request.body.devoured
        },
        condition,
        function(result)
        {
            if ((result.changedRows === 0))
            {
                return response.status(404).end();
            }
            else
            {
                response.status(200).end();
            }
        });
});

router.delete('/api/burgers/:id', function (request, response)
{
    var condition = "id = " + request.params.id;

    console.log("condition", condition);

    burger.deleteOne(condition, function(result)
    {
        if (result.changedRows === 0)
            {
                return response.status(404).end();
            }
            else
            {
                response.status(200).end();
            }
    });
});

module.exports = router;