import { useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Core/Button";
import "./todoView.css";
import Checkbox from "../Core/CheckBox";
import {
  addTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../api/taskService";

export type Task = {
  id: number;
  completed: boolean;
  title: string;
  description: string;
};

const TodoView = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const taskObj = {
    id: 0,
    completed: false,
    title: "",
    description: "",
  };
  const [count, setCount] = useState<number>(0);

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>(taskObj);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSubmit = async (task: Task) => {
    await addTask(task);
    getAllTasks().then((res) => setTaskList(res));
    handleClose();
  };
  const handleCompleted = async (task: Task) => {
    console.log(task);
    task.completed = !task.completed;
    setTask(task);
    await updateTask(task);
    getAllTasks().then((res) => setTaskList(res));
  };
  const handleEdit = (task: Task) => {
    setIsEditing(true);
    setShow(true);
    setTask(task);
  };
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    getAllTasks().then((res) => setTaskList(res));
  };
  useEffect(() => {
    getAllTasks().then((res) => setTaskList(res));
  }, []);
  return (
    <div className="todoPage">
      <div className="flex justify-center">
        <Button
          label={"Create a task"}
          handleClick={() => {
            setIsEditing(false);
            setTask(taskObj);
            handleShow();
          }}
        />
      </div>
      <div className="tableContainer">
        <table className="customTable">
          <thead>
            <tr>
              <th className="completeCol">Completed</th>
              <th className="TitleCol">Title</th>
              <th className="DescriptionCol">Description</th>
              <th className="ActionCol">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="dataBlock">
                      <Checkbox
                        completed={item.completed}
                        toggleCompleted={() => handleCompleted(item)}
                      />
                    </div>
                  </td>
                  <td className="TitleCol">{item.title}</td>
                  <td className="DescriptionCol">{item.description}</td>
                  <td>
                    <div className="dataBlock">
                      <button title="Edit" onClick={() => handleEdit(item)}>
                        ✏️
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        taskObj={task}
        setTaskObj={setTask}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TodoView;
