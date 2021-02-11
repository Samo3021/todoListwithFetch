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
