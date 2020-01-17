import React from 'react';

import './styles.css';

function DevItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatarUrl} alt={dev.name}></img>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>
        {dev.bio}
      </p>
      <a href={`https://github.com/${dev.githubUsername}`}>Acessar perfil no GitHub</a>
    </li>
  );
}

export default DevItem;
