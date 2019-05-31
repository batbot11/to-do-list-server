import mongoose, {Schema} from "mongoose";

const schema = new mongoose.Schema({
    user: {type: Schema.Types.Object, ref: "UserModel"},
    todo: {type: String, required: true},
    isDone: {type: Boolean, default: false}
})

schema.methods.toggle = function toggle() {
   this.isDone = !this.isDone;
}

schema.methods.edit = function edit(newTodo) {
    this.todo = newTodo
} 


export default mongoose.model("TodoModel", schema);