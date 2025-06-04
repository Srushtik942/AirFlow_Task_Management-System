const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

// Endpoint 1. Add a Task to the Task List

function addTask(taskId,text,priority){
  tasks.push({
    taskId: taskId,
    text: text,
    priority: priority
  })
  return tasks
}

app.get('/tasks/add',async(req,res)=>{
    try{
    let taskId = parseInt(req.query.taskId);
    let text = req.query.text;
    let priority = parseInt(req.query.priority);

    let result =  addTask(taskId,text,priority);

    res.status(200).json({"Result:":result});
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }

})

function getAllTasks(){
    return tasks;
}


app.get('/tasks',async(req,res)=>{
    try{
    let result = await getAllTasks();
    res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }

})

// Endpoint 3. Sort Tasks by Priority

function sortByPriority(tasks){
   let response = tasks.sort((t1,t2)=> t1.priority - t2.priority);
   return response
}

app.get('/tasks/sort-by-priority',async(req,res)=>{
    try{
        let result = await sortByPriority(tasks);
        res.status(200).json(result);

    }catch(error){
        res.status(500).json("Internal Server Error");
    }
})

// Endpoint 4. Edit Task Priority

function editTaskPriority(tasks,taskId,priority){
   for(let i=0;i<tasks.length;i++){
    if(tasks[i].taskId === taskId ){
        tasks[i].priority = priority;
    }
   }
   return tasks;
}


app.get('/tasks/edit-priority',async(req,res)=>{
    try{
    let taskId = parseInt(req.query.taskId);
    let priority = parseInt(req.query.priority);

    let result = editTaskPriority(tasks,taskId,priority);
    res.status(200).json({result});
    }catch(error){
        res.status(500).json("Internal Server Error!");
    }
})

// Endpoint 5. Edit/Update Task Text

function updateTaskText(tasks,taskId,text){
    for(let i=0;i<tasks.length;i++){
       if(tasks[i].taskId === taskId){
        tasks[i].text = text;
       }
    }
    return tasks;
}


app.get('/tasks/edit-text',async(req,res)=>{
    try{
        let taskId = parseInt(req.query.taskId);
        let text = req.query.text;

        // console.log(text);
        let result = await updateTaskText(tasks,taskId,text);
        res.status(200).json({result});
    }catch(error){
        res.status(500).json({message:"Internal Server Error!",error:error.message})
    }
})


// Endpoint 6. Delete a Task from the Task List

function removeTask(tasks,taskId){
    const newTask = [];
    const response = tasks.filter((task)=>task.taskId !== taskId);
    return newTask.push(response);
}


app.get('/tasks/delete',async(req,res)=>{
    try{

      let taskId = parseInt(req.query.taskId);
      let result = removeTask(tasks,taskId);

      res.status(200).json({message:"Task Deleted Successfully!"});

    }catch(error){
        res.status(500).json({message:"Error in deleting tasks!",error:error.message});
    }
})


// Endpoint 7. Filter Tasks by Priority

function filterTask(tasks,priority){
    const response = tasks.filter((task)=>task.priority === priority);
    return response;
}


app.get('/tasks/filter-by-priority',async(req,res)=>{
    try{
        let priority = parseInt(req.query.priority);
        let result = await filterTask(tasks,priority);

        res.status(200).json({result});

    }catch(error){
        res.status(500).json({message:"Internal Server Error!",error:error.message});
    }
})




const PORT = 3000;
app.listen(PORT,()=>{
   console.log(`Server is running on ${PORT}`);
})
