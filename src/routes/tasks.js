import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const tasksFilePath = path.join(__dirname, '../../data/tasks.json');

const readTasks = () => {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(tasksData);
}

const writeTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

router.post("/post", (req,res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json({ message: "Tarea creada exitosamente", task: newTask});
    
});

router.get("/", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

router.get("/:id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task){
        return res.status(404).json({ message: "Tarea no encontrada" });
    };
    res.json(task);
});

router.put("/:id", (req, res) => {
    const tasks = readTasks();
    const tasksIndex = tasks.findIndex((t) => t.id === parseInt(req.params.title));
    
    if(tasksIndex === -1){
        return res.status(404).json({ message: "Tarea no encontrada" });
    };
    const updateTask = {
        ...tasks[tasksIndex],
        title: req.body.title,
        description: req.body.description
    };
    tasks[tasksIndex] = updateTask;
    writeTasks(tasks);
    res.json({message: "Tarea actualizada correctamente", task: updateTask});
});

router.delete("/:id", (req, res) => {
    const tasks = readTasks();
    const newTasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    if(tasks.length === newTasks.length){
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    writeTasks(newTasks);
    res.json({ message: "Tarea eliminada correctamente" });
});

export default router;