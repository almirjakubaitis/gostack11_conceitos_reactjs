import React from "react";
import  { useState, useEffect } from 'react';

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

      const response = await api.post('repositories', {
        title: "Desafio 3 React JS",
	      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios",
	      techs: ["Node.js","React JS", "React"]

      });

      const repository = response.data;
      setRepositories([...repositories,repository]);

  }  

  async function handleRemoveRepository(id) {

      await api.delete(`repositories/${id}`);

      const respositoriesRest = repositories.filter(index => index.id !== id );
      //console.log(respositoriesRest);

      setRepositories([...respositoriesRest]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
        
         <li key={repository.id}>{repository.title}

          <button key={repository.id} onClick={() => handleRemoveRepository(`${repository.id}`)}>
            Remover
          </button>
        </li>
        ) }


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
