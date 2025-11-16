import React, { useState } from 'react';
import GroupList from '../../Modules/GroupList/GroupList';
import { groupService } from '../../services/groupService';
import './grupoCriar.css';

function GrupoCriar() {
  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateGroup = async () => {
    if (!formData.name.trim()) {
      setError('Nome do grupo é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      console.log('Criando grupo:', formData);
      
      await groupService.createGroup({
        name: formData.name,
        description: formData.desc || ''
      });

      setSuccess('Grupo criado com sucesso!');
      setFormData({ name: '', desc: '' });
      
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      console.error('Erro ao criar grupo:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({ name: '', desc: '' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="mainContainer">
      <div className="gCriarContainer">
        <div className="campanhaTitle">
          <h2>Grupos</h2>
          <span className="btn-novo-grupo">Novo Grupo</span>
        </div>
        
        <div className="gSectionContainer">
          <div className="gCriarSection left">
            <div className="userList">
              <GroupList refreshTrigger={refreshTrigger} />
            </div>
          </div>
          
          <div className="gCriarSection right">
            <div className="dadosGrupoSection">
              <h3>Dados do Grupo</h3>
              
              {error && (
                <div className="error-message-form">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="success-message">
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
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="formGroup">
                  <label>Descrição do Grupo</label>
                  <textarea 
                    placeholder="Digite a descrição do grupo" 
                    rows="3" 
                    value={formData.desc}
                    onChange={(e) => handleInputChange('desc', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="membrosSection">
              <h3>Membros do Grupo</h3>
              
              <div className="membrosHeader">
                <span>Nome</span>
                <span>E-mail</span>
              </div>
              
              <div className="membrosList">
                <div className="membroItem">
                  <span>Funcionalidade em desenvolvimento</span>
                  <span>Em breve você poderá adicionar membros</span>
                </div>
              </div>
            </div>

            <div className="formActions">
              <button 
                className="btn-cancelar" 
                onClick={handleClearForm}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                className="btn-criar" 
                onClick={handleCreateGroup}
                disabled={loading || !formData.name.trim()}
              >
                {loading ? 'Criando...' : 'Criar Grupo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrupoCriar;