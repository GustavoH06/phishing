// src/Pages/TemplateCriar/TemplateCriar.js
import React, { useState } from 'react';
import TemplateList from '../../Modules/TemplateList/TemplateList';
import { templateService } from '../../services/templateService';
import './templateCriar.css';

function TemplateCriar() {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    code: ''
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

  const handleCreateTemplate = async () => {
    if (!formData.name.trim()) {
      setError('Nome do template é obrigatório');
      return;
    }

    if (!formData.code.trim()) {
      setError('Código HTML do template é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      console.log('Criando template:', formData);
      
      await templateService.createTemplate({
        name: formData.name,
        desc: formData.desc || '',
        code: formData.code
      });

      setSuccess('Template criado com sucesso!');
      setFormData({ name: '', desc: '', code: '' });
      
      // Atualiza a lista de templates
      setRefreshTrigger(prev => prev + 1);
      
    } catch (err) {
      console.error('Erro ao criar template:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({ name: '', desc: '', code: '' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="mainContainer">
      <div className="gCriarContainer">
        <div className="campanhaTitle">
          <h2>Templates</h2>
          <span className="btn-novo-grupo">Novo Template</span>
        </div>
        
        <div className="gSectionContainer">
          <div className="gCriarSection left">
            <div className="userList">
              <TemplateList refreshTrigger={refreshTrigger} />
            </div>
          </div>
          
          <div className="gCriarSection right">
            <div className="dadosGrupoSection">
              <h3>Dados do Template</h3>
              
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
                  <label>Nome do Template *</label>
                  <input 
                    type="text" 
                    placeholder="Digite o nome do template" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="formGroup">
                  <label>Descrição do Template</label>
                  <textarea 
                    placeholder="Digite a descrição do template" 
                    rows="3" 
                    value={formData.desc}
                    onChange={(e) => handleInputChange('desc', e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="formGroup">
                  <label>Código HTML *</label>
                  <textarea 
                    placeholder="Digite o código HTML do template" 
                    rows="8" 
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    disabled={loading}
                    className="code-textarea"
                  />
                </div>
              </div>
            </div>

            <div className="previewSection">
              <h3>Preview do Template</h3>
              
              <div className="previewContainer">
                {formData.code ? (
                  <div 
                    className="template-preview" 
                    dangerouslySetInnerHTML={{ __html: formData.code }}
                  />
                ) : (
                  <div className="preview-placeholder">
                    O preview do template será exibido aqui quando você inserir o código HTML
                  </div>
                )}
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
                onClick={handleCreateTemplate}
                disabled={loading || !formData.name.trim() || !formData.code.trim()}
              >
                {loading ? 'Criando...' : 'Criar Template'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateCriar;