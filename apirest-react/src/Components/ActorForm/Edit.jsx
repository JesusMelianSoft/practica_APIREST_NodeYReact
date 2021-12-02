import React from 'react'
import {useState} from "react";

export const Edit = ({ actors, onEdit, id}) => {
    const filtrarId = (id) => {
        const result = actors.filter(actors => actors.actor_id === id);
        console.log('Result:', result);
        return result[0];
    }
    const myActor = filtrarId(id);
    const [actor, setActor] = useState({
        actor_id: myActor.actor_id,
        first_name: myActor.first_name,
        last_name: myActor.last_name
    });
    

    const handleInputChange = (event) => {
        console.log(event.target.value);
        setActor({
            ...actor,
            [event.target.name]: event.target.value
        })
        console.log("mi actor: ",actor);
    }
    const handleSubmit = (e) => {
        const myActor = {
            actor_id: id,
            first_name: actor.first_name,
            last_name: actor.last_name
        };
        

        e.preventDefault();

        onEdit(actor);
        //RESETEAMOS EL VALOR DE ACTOR PARA BORRAR LOS INPUTS
        setActor({
            first_name: '',
            last_name: ''
        })

    }
        return (
            <>
            <h1 className="text-center">Editar actor</h1>
                <form className="form-padding border border-dark" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="first_name">Nombre</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" onChange={handleInputChange} value={actor.first_name}/>
                    </div>

                    <div className="form-group">
                        <label for="last_name">Apellidos</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleInputChange} value={actor.last_name}/>
                    </div>
                    <button type="submit" className="btn btn-primary">EDITAR</button>
                </form>
            </>
        )
    
    
}
