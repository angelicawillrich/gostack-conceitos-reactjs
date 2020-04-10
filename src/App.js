import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Projeto ${Date.now()}`,
      url: 'www.rocketseat.com.br',
      techs: ['Javascript', 'ReactJS']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const repoIndex = repositories.findIndex
      (repository => repository.id === id);
        
      setRepositories(repositories
        .slice(0, repoIndex)
        .concat(repositories
          .slice(repoIndex + 1)
        )
      );
    } catch (err) {
      alert('Item could not be deleted.')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
