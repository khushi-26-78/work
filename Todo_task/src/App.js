import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ContextMenu } from '../util/style';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [todo, setTodo] = useState([]);
  const [searchTodo, setSearchTodo] = useState([]);
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [showNested, setShowNested] = useState(false);
  const [pointsNested, setPointsNested] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState('');
  const itemIndex = 0;

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const addTask = (e) => {
    setShowModal(false);
    todo.push({ title: title, descriptions: des, stat: 'todo' });
    searchTodo.push({
      title: title,
      descriptions: des,
      stat: 'todo',
    });
    console.log(todo);
  };

  const disableStyle = {
    pointerEvents: 'none',
    opacity: '0.6',
  };

  function changeState(type) {
    if (type == 'todo') {
      let newArr = [...searchTodo];
      newArr[itemIndex].stat = 'todo';
      setSearchTodo(newArr);
      setShowNested(false);
      setShow(false);
    } else if (type == 'inprogress') {
      let newArr = [...searchTodo];
      newArr[itemIndex].stat = 'inprogress';
      setSearchTodo(newArr);
      setShowNested(false);
      setShow(false);
    } else if (type == 'done') {
      let newArr = [...searchTodo];
      newArr[itemIndex].stat = 'done';
      setSearchTodo(newArr);
      setShowNested(false);
      setShow(false);
    }
  }

  const deleteTask = () => {
    searchTodo.splice(itemIndex);
    setShow(false);
  };

  function handleSearch(e) {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = todo.filter((item) => {
        return item.title
          .toLowerCase()
          .startsWith(keyword.toLowerCase());
      });
      setSearchTodo(results);
    } else {
      setSearchTodo(todo);
    }

    setSearch(keyword);
  }

  return (
    <>
      <Modal
        className="modalClass"
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>New Task</Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-container">
              <label>Title: </label>
              <input
                type="text"
                name="title"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <label>Descriptions: </label>
              <input
                type="text"
                name="descriptions"
                required
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addTask}>Add</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modalClass"
        show={showDeleteModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>Delete Task</Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete the task?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteTask}>Yes</Button>
        </Modal.Footer>
      </Modal>

      <div className="header">
        <div className="left-header">TODO TASK</div>
        <div className="right-header">
          <div>
            <input
              className="search-input"
              type="text"
              name="search"
              placeholder="Search task"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <button onClick={handleShow}>ADD</button>
        </div>
      </div>
      <div className="main">
        <div className="todo">
          <div className="todo-box">
            <h4>TO DO</h4>
          </div>
        </div>
        <div className="in-progress">
          <div className="progress-box">
            <h4>IN PROGRESS</h4>
          </div>
        </div>
        <div className="todo-done">
          <div className="done-box">
            <h4>DONE</h4>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="todo-content">
          <ul>
            {searchTodo.map((item, index) => {
              return (
                item.stat == 'todo' && (
                  <li
                    key={index}
                    onContextMenu={(e) => {
                      console.log('Context Menu Opened');
                      e.preventDefault();
                      setShow(true);
                      console.log(e.pageX);
                      console.log(e.pageY);
                      setPoints({ x: e.pageX, y: e.pageY });
                      itemIndex = index;
                    }}
                  >
                    <a href="#">
                      <h2>{item.title}</h2>
                    </a>
                  </li>
                )
              );
            })}
            {show && (
              <ContextMenu top={points.y} left={points.x}>
                <ul>
                  <li
                    onClick={(e) => {
                      console.log('Context Menu Opened');
                      e.preventDefault();
                      setShowNested(true);
                      console.log(e.pageX);
                      console.log(e.pageY);
                      setPointsNested({ x: e.pageX, y: e.pageY });
                    }}
                  >
                    Send to
                  </li>
                  <li onClick={() => setShowDeleteModal(true)}>
                    Delete
                  </li>
                  <li>Archive</li>
                </ul>
              </ContextMenu>
            )}
            {showNested && (
              <ContextMenu top={pointsNested.y} left={pointsNested.x}>
                <ul>
                  <li
                    style={
                      searchTodo[itemIndex].stat != 'todo'
                        ? {}
                        : disableStyle
                    }
                    onClick={(e) => {
                      changeState('todo');
                    }}
                  >
                    TODO
                  </li>
                  <li
                    style={
                      searchTodo[itemIndex].stat != 'inprogress'
                        ? {}
                        : disableStyle
                    }
                    onClick={(e) => changeState('inprogress')}
                  >
                    In Progress
                  </li>
                  <li
                    style={
                      searchTodo[itemIndex].stat != 'done'
                        ? {}
                        : disableStyle
                    }
                    onClick={(e) => changeState('done')}
                  >
                    Done
                  </li>
                </ul>
              </ContextMenu>
            )}
          </ul>
        </div>
        <div className="vl"></div>
        <div className="progress-content">
          <ul>
            {searchTodo.map((item, index) => {
              return (
                item.stat == 'inprogress' && (
                  <li
                    key={index}
                    onContextMenu={(e) => {
                      console.log('Context Menu Opened');
                      e.preventDefault();
                      setShow(true);
                      console.log(e.pageX);
                      console.log(e.pageY);
                      setPoints({ x: e.pageX, y: e.pageY });
                      itemIndex = index;
                    }}
                  >
                    <a href="#">
                      <h2>{item.title}</h2>
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div className="vl"></div>
        <div className="done-content">
          <ul>
            {searchTodo.map((item, index) => {
              return (
                item.stat == 'done' && (
                  <li
                    key={index}
                    onContextMenu={(e) => {
                      console.log('Context Menu Opened');
                      e.preventDefault();
                      setShow(true);
                      console.log(e.pageX);
                      console.log(e.pageY);
                      setPoints({ x: e.pageX, y: e.pageY });
                      itemIndex = index;
                    }}
                  >
                    <a href="#">
                      <h2>{item.title}</h2>
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
