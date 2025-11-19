import React from 'react';
import './grupoCriarComponents.css';

function GroupForm({ formData, loading, onInputChange, error, success }) {
  return (
    <div className="dadosGrupoSection">
      <h3>Dados do Grupo</h3>
      
      {error && (
        <div className="errorMessageForm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="successMessage">
          {success}
        </div>
      )}
      
      <div className="formGrupo">
        <div className="formGroup">
          <label>Nome do Grupo *</label>
          <input 
            type="text" 
            placeholder="Digite o nome do grupo" 
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="formGroup">
          <label>Descrição do Grupo</label>
          <textarea 
            placeholder="Digite a descrição do grupo" 
            rows="3" 
            value={formData.desc}
            onChange={(e) => onInputChange('desc', e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default GroupForm;