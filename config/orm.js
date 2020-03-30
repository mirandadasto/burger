const connection = require("../config/connection");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }

function createQuestionMarks(num) {
    var arr = [];
    
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    
    return arr.toString();
    }

var orm = 
{
    selectAll: function(table, callback)
    {
        var databaseQuery = "SELECT * FROM " + table + ";";

        connection.query(databaseQuery, function(err, result)
        {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    insertOne: function(table, columns, values, callback)
    {
        var databaseQuery = "INSERT INTO " + table + " (" + columns.toString() + ") " + "VALUES (" + createQuestionMarks(values.length) + ") ";
        
        // console.log(databaseQuery);
        connection.query(databaseQuery, values, function(err, result)
        {
            if (err)
            {
                throw err;
            }
            callback(result);
        });
    },

    updateOne: function(table, objColVals, condition, callback)
    {
        var databaseQuery = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

        // console.log(databaseQuery);
        connection.query(databaseQuery, values, function(err, result)
        {
            if (err)
            {
                throw err;
            }
            callback(result);
        });
    },

    deleteOne: function(table, condition, callback)
    {
        var databaseQuery = "DELETE FROM " + table + " WHERE " + condition;

        // console.log(databaseQuery);
        connection.query(databaseQuery, values, function(err, result)
        {
            if (err)
            {
                throw err;
            }
            callback(result);
        });
    }
};

module.exports = orm;