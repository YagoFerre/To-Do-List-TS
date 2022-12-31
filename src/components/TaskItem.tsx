import { Trash, Check } from "phosphor-react";
import styles from "./TaskItem.module.css";

import * as Checkbox from "@radix-ui/react-checkbox";

interface TaskItemProps {
    task: {
        id: number;
        content: string;
        isCompleted: boolean;
    }
    onDelete: (taskId: number) => void;
    onComplete: (taskId: number) => void;
}

export function TaskItem({ task, onDelete, onComplete }: TaskItemProps) {
    function handleDeleteTask() {
        onDelete(task.id)
    }

    function handleCompleteTask() {
        onComplete(task.id);
    }

    return (
        <div className={styles.task}>
            <Checkbox.Root
                className={styles.rootCheckbox}
                checked={task.isCompleted}
                onClick={handleCompleteTask}
            >
                <Checkbox.Indicator className={styles.indicator} >
                    <Check className={styles.check} weight="bold" data-state="checked" />
                </Checkbox.Indicator>
            </Checkbox.Root>

            <div className={styles.title}>
                <p className={task.isCompleted ? styles.tached : ""}>
                    {task.content}
                </p>
            </div>

            <button className={styles.button} onClick={handleDeleteTask}>
                <Trash size={18} />
            </button>
        </div>
    );
}