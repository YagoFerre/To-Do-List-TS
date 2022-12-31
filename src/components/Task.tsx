import { ClipboardText } from "phosphor-react";
import { PlusCircle } from 'phosphor-react';
import styles from "./Task.module.css";

import { TaskItem } from "./TaskItem";
import { ChangeEvent, FormEvent, useState } from "react";

interface Task {
    id: number;
    content: string;
    isCompleted: boolean;
}

export function Task() {
    const [task, setTask] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState("");

    const taskAllDone = task.reduce((total, task) => {
        if (task.isCompleted === true) {
            return (total += 1)
        } else {
            return total;
        }
    }, 0)

    function handleCreateNewTask() {
        const newTask = {
            id: Math.random(),
            content: newTaskText,
            isCompleted: false,
        }
        setTask(oldTask => [...oldTask, newTask]);
        setNewTaskText('');
    }

    function handleCreateNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskText(event.target.value);
    }

    function deleteTask(taskId: number) {
        const taskToDelete = task.filter(task => {
            return task.id !== taskId;
        })

        setTask(taskToDelete)
    }

    function completeTask(taskId: number) {
        const taskCompleted = task.map(task => task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task);

        setTask(taskCompleted);
    }

    const isTaskInputEmpty = newTaskText.length === 0;

    return (
        <div>
            <div className={styles.form}>
                <input 
                    type="text"
                    placeholder="Adicione uma nova tarefa"
                    name="task"
                    value={newTaskText}
                    onChange={handleCreateNewTaskChange}
                />
                <button type="submit" onClick={handleCreateNewTask} disabled={isTaskInputEmpty}>
                    Criar
                    <PlusCircle size={20}/>
                </button>
            </div>

            <div className={styles.container}>
                <strong className={styles.strongOne}>Tarefas criadas <span>{task.length}</span></strong>
                <strong className={styles.strongTwo}>Concluídas <span>{taskAllDone} de {task.length}</span></strong>
            </div>
            

            {task.length === 0 ? (
                <main className={styles.content}>
                    <ClipboardText size={56}/>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </main>
            ) : (
                <div className={styles.taskList}>
                    {task.map(task => {
                        return (
                                <TaskItem 
                                    onDelete={deleteTask}
                                    onComplete={completeTask}
                                    task={task}
                                /> 
                        );
                    })}
                </div>
            )}
        </div>

    );
}