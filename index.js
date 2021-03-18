const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql', {encoding : 'utf-8'});
const resolvers = require('./resolvers');

const{ makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
app.use('/graphql', graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL : '/graphql'}));

const todo = require('./models/todo');

    mongoose.connect("mongodb://localhost:27017/sampleDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(()=> console.log("DB is connected!"))
    .catch(()=> console.log("DB is not connected"))


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());

app.post("/", (req, res)=>{

        const { name, isdone } = req.body;

        var TodoAdd = new todo({
            name : name,
            isdone : isdone
        });

        TodoAdd.save((err, todo)=>{
            if(err){
                return res.status(500).json({
                    err : "Not able to store todo"
                })
            }
            else{
                return res.status(200).json({
                    message : "todo saved successfully",
                    todo
                })
            }
        })

    })

app.get("/", (req, res)=>{
    todo.find().exec((err, todos)=>{
        if(err){
            return res.status(500).json({
                err : "Err fetching todos"
            })
        }
        else if(!todos){
            return res.status(404).json({
                err : "No todos in db"
            })
        }
        else{
            return res.status(200).json({
                message : "All Todos",
                todos
            })
        }
    })
})
app.get("/api", (req, res)=>{
    return res.status(200).json({
        message : "Welcome!"
    })
});

app.listen(8000, ()=>{console.log(`App is running on port 8000`)})