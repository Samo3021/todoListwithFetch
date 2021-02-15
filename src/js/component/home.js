import React from "react";
import shortid from "shortid";
//include images into your bundle
//create your first component
export function Home() {
	//funciones para hacerlo cambios
	const [tarea, setTarea] = React.useState("");
	const [arrayTareas, setArrayTareas] = React.useState([]);
	const agregarTarea = e => {
		e.preventDefault();

		setArrayTareas([
			...arrayTareas,
			{
				id: shortid.generate(),
				nombreTarea: tarea
			}
		]);
		setTarea("");
	};
	const eliminartTarea = id => {
		let newlist = arrayTareas.filter(item => item.id !== id);
		setArrayTareas(newlist);
	};
	const postInfo = () => {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/SamuelCr", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};
	const getInfo = () => {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/SamuelCr", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				console.log(res.ok);
				console.log(res.status);
				console.log(res.text());
				return res.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	getInfo();
	postInfo();

	return (
		<div>
			<h1>TODOLIST</h1>
			<div className="container justify-content">
				<div>
					<form onSubmit={agregarTarea}>
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Ingrese Tarea"
							onChange={e => setTarea(e.target.value)}
							value={tarea}
						/>
					</form>
				</div>
				<div>
					<ul className="list-group overflow-auto">
						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								<span className="lead">{item.nombreTarea}</span>
								<button
									type="button"
									className="btn btn-muted "
									onClick={() => eliminartTarea(item.id)}>
									<i className="fas fa-times-circle"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
