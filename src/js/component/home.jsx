import React, {useEffect, useState} from "react";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodos, setNewTodos] = useState("");
	
	function getTodos(){
		fetch("https://playground.4geeks.com/todo/users/floracu20")
		//se revisa el estado de la petición:
		.then((resp)=>{
			return resp.json() //convierte de JSON a algo que JS entiende
		})
		//se recibe la data como objeto:
		.then((data)=>{
			console.log(data)
			setTodos(data.todos)
		})
		//manejo de errores:
		.catch((error) => {return error});
	}

	function postTodo(){
		let newTask = {
			label: newTodos,
			is_done: false
		}
		fetch("https://playground.4geeks.com/todo/todos/floracu20", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response)=>{
			return response.json()
		})
		.then((data)=>{
			console.log(data);
			getTodos(); //para actualizar la lista
		})
		.catch((err)=>{return err})
	}

	function deleteTodo(index) {
		const todoToDelete = todos[index];
		fetch(`https://playground.4geeks.com/todo/todos/${todoToDelete.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			getTodos(); //actualizo la lista otra vez
		})
		.catch((err) => {return err});
	}

	//para que la lista aparezca al inicio:
	useEffect(() => {getTodos(); }, []); //el "[]" del final es porque se va a ejecutar una vez, al comienzo.

	return (
		<div className="text-center mt-5 container">
			<h1>My To-do list ✅</h1>
			<br></br>
			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="What needs to be done?" aria-describedby="button-addon2" value={newTodos} onChange={(e)=>setNewTodos(e.target.value)}
			/>
				<button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={postTodo}>Post</button>
			</div>

			{todos.length == 0 ? (<h6 className="p-2">You have no pending tasks, add one!</h6>) : (todos.map((todo, index)=>{
				return (<div key={index} className="one-task d-flex" style={{justifyContent: "space-between"}}>
					<li className="list-group-item">{todo.label}</li>
					<button type="button" className="btn-close p-3" style={{height: "8px"}} aria-label="Close" 
					onClick={()=> deleteTodo(index)}>
					</button>
				</div>)
			}))}

			{todos.length !== 0 && (<p className="p-2" id="tasksLeft">Keep going! You have {todos.length} {todos.length === 1 ? "task" : "tasks"} left.</p>)}
		</div>
	);
};

export default Home;
