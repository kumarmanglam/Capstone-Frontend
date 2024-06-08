import "./modal.css";
type Task = {
  id: number;
  completed: boolean;
  title: string;
  description: string;
};
type Modal = {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  taskObj: Task;
  setTaskObj: (task: Task) => void;
  isEditing: boolean;
  handleSubmit: (task: Task) => void;
};

const Modal = ({
  show,
  handleClose,
  handleShow,
  taskObj,
  setTaskObj,
  isEditing,
  handleSubmit,
}: Modal) => {
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (taskObj.title.trim().length == 0) {
      alert("fill the title to save a task");
    } else if (taskObj.description.trim().length == 0) {
      alert("fill the description to save a task");
    } else {
      handleSubmit(taskObj);
      // console.log("new Task obj ==.>> " + JSON.stringify(taskObj));
      setTaskObj({
        id: 0,
        completed: false,
        title: "",
        description: "",
      });
    }
  };
  return (
    <div
      className={`modalWrapper ${show ? "showModal" : "hideModal"}`}
      onClick={handleClose}
    >
      <div className={`modal p-10`} onClick={handleModalClick}>
        <p className="modalHeader">
          {isEditing ? "Update Task" : "Create a Task"}
        </p>
        <form className="formModal" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="formGroup">
            <input
              type="text"
              placeholder="Title"
              className="myInp"
              value={taskObj.title}
              onChange={(event) =>
                setTaskObj({ ...taskObj, title: event.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              className="myInp"
              value={taskObj.description}
              onChange={(event) =>
                setTaskObj({ ...taskObj, description: event.target.value })
              }
            />
          </div>
          {isEditing ? (
            <div className="checkWrap">
              <label htmlFor="checkbox">Completed</label>
              <input
                id="checkbox"
                type="checkbox"
                className="myInp"
                checked={taskObj.completed}
                onChange={() =>
                  setTaskObj({ ...taskObj, completed: !taskObj.completed })
                }
              />
            </div>
          ) : null}

          <input className="mybtn3" type="submit" value="Submit" />
        </form>
        <button className="closeBtn" onClick={handleClose}>
          x
        </button>
      </div>
    </div>
  );
};

export default Modal;
