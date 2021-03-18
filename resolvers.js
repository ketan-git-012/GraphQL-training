const db = require('./db');
const Query = {
    test : () => 'Test Success, GraphQL server is up & running !!',
    data : () => 'this is data query',
    Greentings : () => 'Hello greetings!',
    students:() => db.students.list(),
    studentById : (root, args, context, info)=>{
        return db.students.get(args.id);
    },
    sayHello : (root, args, context, info)=>`welcome ${args.name}`
}

const Mutation = {
    createStudent: (root, args, context, info)=>{
        return db.students.create({
            firstName : args.firstName,
            email : args.email,
            collegeId : args.collegeId
        })
    }
}
const Students = {
    fullName : (root, args, context, info)=>{
        return root.firstName+ " " + root.lastName
    },
    college : (root) =>{
        return db.colleges.get(root.collegeId);
    }
}

module.exports = {Query,Students,Mutation}