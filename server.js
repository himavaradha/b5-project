const e= require("express")
const m=require("mongoose")
const a=e()
a.use(e.json())
m.connect("mongodb://localhost:27017/aidsc_students")
.then(()=>{
    console.log("mongodb is connected")
})
.catch((e)=>{
    console.log(`error is ${e}`)
})
const studentSchema=m.Schema({
    name:"String",
    age:"Number",
    gender:"String",
    course:"String",
    year:"Number",
    marks:"Number",
    city:"String",
    email:"String"
})
const student=m.model("students",studentSchema)
a.post("/create_student",async(req,res)=>{
    const s=await student.insertOne(req.body)
    await res.send(s)
})
a.post("/create_students",async(req,res)=>{
    const s=await student.insertMany(req.body)
    await res.send(s)
})

a.get("/students",async(req,res)=>{
    const s=await student.find()
    await console.log(s)
    await res.send(s)
})
a.get("/student",async(req,res)=>{
    console.log(req.body)
    const s=await student.find(req.body) 
    await res.send(s)
})



const p=8888
a.listen(p,()=>{
    console.log(`server is running at http://localhost:${p}`)
})