import React, { useState, useEffect } from 'react';
import SideNav from "../../Modules/sidenav/SideNav";
import { campaignService } from '../../services/campaignService';
import { groupService } from '../../services/groupService';
import { templateService } from '../../services/templateService';
import './campanhaCriar.css';

function CampanhaCriar() {
  const [formData, setFormData] = useState({
    name: '',
    group_id: '',
    template_id: '',
    start_date: '',
    end_date: '',
    send_time: '',
    subject_text: '',
    title_text: '',
    body_text: '',
    button_text: '',
    email: ''
  });
  
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  //Carregar grupos e templates
  useEffect(() => {
    loadGroups();
    loadTemplates();
  }, []);

  const loadGroups = async () => {
    try {
      const response = await groupService.getGroups();
      setGroups(response.items || []);
    } catch (err) {
      console.error('Erro ao carregar grupos:', err);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await templateService.getTemplates();
      setTemplates(response.items || []);
    } catch (err) {
      console.error('Erro ao carregar templates:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateCampaign = async () => {
    // Validações básicas
    if (!formData.name || !formData.group_id || !formData.start_date || 
        !formData.end_date || !formData.send_time || !formData.email) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      console.log('Criando campanha:', formData);
      
      await campaignService.createCampaign(formData);

      setSuccess('Campanha criada com sucesso!');
      
      //Limpar o form
      setFormData({
        name: '',
        group_id: '',
        template_id: '',
        start_date: '',
        end_date: '',
        send_time: '',
        subject_text: '',
        title_text: '',
        body_text: '',
        button_text: '',
        email: ''
      });
      
    } catch (err) {
      console.error('Erro ao criar campanha:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      group_id: '',
      template_id: '',
      start_date: '',
      end_date: '',
      send_time: '',
      subject_text: '',
      title_text: '',
      body_text: '',
      button_text: '',
      email: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="campanhaCriar">
      <div className="hSidenav">
        <SideNav />
      </div>

      <div className="cCriarContent">
        <h2>Nova Campanha</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {/*Dados da campanha*/}
        <div className="sectionContainer">
          <h3 className="sectionTitle">Dados da Campanha</h3>
          <div className="sectionBox">
            <div className="formSingleColumn">
              <div className="formGroup">
                <label>Nome da Campanha *</label>
                <input 
                  type="text" 
                  placeholder="Campanha Inverno 2025" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="formGroup">
                <label>Grupo *</label>
                <select 
                  value={formData.group_id}
                  onChange={(e) => handleInputChange('group_id', e.target.value)}
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>Template</label>
                <select 
                  value={formData.template_id}
                  onChange={(e) => handleInputChange('template_id', e.target.value)}
                  disabled={loading}
                >
                  <option value="">Selecione...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>E-mail do Remetente *</label>
                <input 
                  type="email" 
                  placeholder="remetente@empresa.com" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="dateRow">
                <div className="formGroup">
                  <label>Data Início *</label>
                  <input 
                    type="date" 
                    value={formData.start_date}
                    onChange={(e) => handleInputChange('start_date', e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="formGroup">
                  <label>Data Fim *</label>
                  <input 
                    type="date" 
                    value={formData.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="formGroup">
                <label>Hora do Disparo *</label>
                <input 
                  type="time" 
                  value={formData.send_time}
                  onChange={(e) => handleInputChange('send_time', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configurar Template */}
        <div className="sectionContainer">
          <h3 className="sectionTitle">Configurar Template</h3>
          <div className="sectionBox">
            <div className="formSingleColumn">
              <div className="formGroup">
                <label>Assunto do e-mail</label>
                <input 
                  type="text" 
                  placeholder="Seu pagamento está atrasado" 
                  value={formData.subject_text}
                  onChange={(e) => handleInputChange('subject_text', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="formGroup">
                <label>Título do e-mail</label>
                <input 
                  type="text" 
                  placeholder="Conta Suspensa" 
                  value={formData.title_text}
                  onChange={(e) => handleInputChange('title_text', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="formGroup">
                <label>Corpo do e-mail</label>
                <textarea 
                  rows="6" 
                  placeholder="Digite o conteúdo do e-mail..." 
                  value={formData.body_text}
                  onChange={(e) => handleInputChange('body_text', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="formGroup">
                <label>Texto do Botão</label>
                <input 
                  type="text" 
                  placeholder="ATUALIZAR AQUI" 
                  value={formData.button_text}
                  onChange={(e) => handleInputChange('button_text', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Prévia do E-mail */}
        <div className="sectionContainer">
          <h3 className="sectionTitle">Prévia do E-mail</h3>
          <div className="sectionBox previewBox">
            <div className="emailPreview">
              <h2 style={{ color: "#e50914" }}>NETFLIX</h2>
              <h3>{formData.title_text || "Título do E-mail"}</h3>
              <p>
                {formData.body_text || "Conteúdo do e-mail será exibido aqui..."}
              </p>
              {formData.button_text && (
                <button className="btn-preview">
                  {formData.button_text}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="actionButtons">
          <button 
            className="btn-cancel" 
            onClick={handleClearForm}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            className="btn-create" 
            onClick={handleCreateCampaign}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Campanha'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampanhaCriar;