const mysql = require("mysql");
var express = require("express");
//var Joi =require("joi");
var emprouter =  express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mydatabase'
  });

var myData =[];
connection.connect();

// function validate(bodyContent)
// {
//     const schema = {
//         "Name": Joi.string().length(6).required(),
//         "No": Joi.number().required(),
//         "Address": Joi.required()
//         };
//    return Joi.validate(bodyContent , schema);
// }

emprouter.post("/",function(request, response){

    //let resultOfValidation= null;//validate(request.body);
    //console.log(resultOfValidation);
    //if(resultOfValidation.error==null)
//{
    let eno = parseInt(request.body.No);
    let ename = request.body.Name;
    let eddress = request.body.Address;

    let query = `insert into emp values(${eno}, '${ename}', '${eddress}')`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err);
        }
    });
//}
//else{
  //  response.contentType("application/json");
    //response.send(JSON.stringify(resultOfValidation));
//}
});


emprouter.put("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let ename = request.body.name;
    let eddress = request.body.empcol;

    let query = `update emp set name= '${ename}',empcol= '${eddress}' where No=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err);
        }
    });

});

emprouter.delete("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let query = `delete from emp where no=${eno}`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err);
        }
    });

});



emprouter.get("/", function(request, response){
    connection.query("select * from emp", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!");
        }
    });

});

emprouter.get("/:no", function(request, response){
    console.log("You searched for " + request.params.no);

    connection.query(`select * from emp where No =${request.params.no}`, function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!");
        }
    });

});

module.exports = emprouter;
