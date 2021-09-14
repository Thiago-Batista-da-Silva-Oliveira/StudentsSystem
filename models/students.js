import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: { type: String, required: true},
    studentclass: { type: String, required: true},
    id: { type: String },
    grade1: {type: Number},
    grade2: {type: Number},
    frequency: {type: Number},

    
  });
  
  export default mongoose.model("Students", studentSchema);