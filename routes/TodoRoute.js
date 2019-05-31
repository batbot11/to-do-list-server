import express from "express";
import passport from "passport";
import TodoModel from "../models/TodoModel";

const route = express.Router();

route.post("/addTodo", passport.authenticate("jwt", {session: false}), (req, res) => {
   const newTodo = new TodoModel ({user: req.user.id, todo: req.body.newTodo.newTodo});
   newTodo.save()
   .then(newTodo => res.json(newTodo))
})

route.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    TodoModel.find({user: req.user.id})
    .then(todos => {
        if (!todos) res.json({Message: "There are no current tasks. Add a new One."})
        else {
            res.json(todos)
        }
    })
})

// @Post     api/todo/toggleTodo
// @Security Public

route.post("/toggleTodo", (req, res) => {
    TodoModel.findById(req.body.todoId)
    .then(todo => {
        todo.isDone = !todo.isDone;
        todo.save()
        .then(savedTodo => res.json(savedTodo))
    })
    .catch(() => {Message: "Unable to toggle todo"})
    
})

// @Post     api/todo/deleteTask
// @Security Public
// @Description Delete a todo

route.delete("/deleteTask", (req, res) => {
    TodoModel.findByIdAndDelete(req.body.todoId)
    .then(() => res.json({Message: "Task Deleted!`"}))
})

// @Post     api/todo/updateTodo
// @Security Public
// @Description Update a todo

route.post("/updateTodo", (req, res) => {
   
})

export default  route;