import React, { useState, useEffect } from 'react';
import SideNav from "../../Modules/sidenav/SideNav";
import { campaignService } from '../../services/campaignService';
import { groupService } from '../../services/groupService';
import { templateService } from '../../services/templateService';
import CampanhaTemplate from './CampanhaCriarComponents/CampanhaTemplate';
import CampanhaForm from './CampanhaCriarComponents/CampanhaForm';

function CampanhaCriar() {
  const [formData, setFormData] = useState({
    name: '',
    groupId: '',
    templateId: '',
    startDate: '',
    endDate: '',
    sendTime: '',
    subjectText: '',
    titleText: '',
    bodyText: '',
    buttonText: '',
    email: ''
  });
  
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadGroups();
    loadTemplates();
  }, []);

  useEffect(() => {
    if (formData.templateId) {
      loadTemplateData(formData.templateId);
    } else {
      setSelectedTemplate(null);
    }
  }, [formData.templateId]);

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

  const loadTemplateData = async (templateId) => {
    try {
      const template = await templateService.getTemplateById(templateId);
      setSelectedTemplate(template);
      
      if (template) {
        setFormData(prev => ({
          ...prev,
          subjectText: prev.subjectText || 'Assunto Importante',
          titleText: prev.titleText || 'Título do Email',
          bodyText: prev.bodyText || 'Conteúdo do email...',
          buttonText: prev.buttonText || 'Clique Aqui'
        }));
      }
    } catch (err) {
      console.error('Erro ao carregar template:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'name', 'groupId', 'templateId', 'startDate', 
      'endDate', 'sendTime', 'email', 'subjectText',
      'titleText', 'bodyText'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError('Preencha todos os campos obrigatórios');
      return false;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('Data de início não pode ser maior que data de fim');
      return false;
    }

    if (!formData.sendTime.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      setError('Formato de hora inválido');
      return false;
    }

    return true;
  };

  const handleCreateCampaign = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const campaignPayload = {
        name: formData.name,
        group_id: formData.groupId,
        template_id: formData.templateId,
        start_date: formData.startDate,
        end_date: formData.endDate,
        send_time: formData.sendTime,
        subject_text: formData.subjectText,
        title_text: formData.titleText,
        body_text: formData.bodyText,
        button_text: formData.buttonText,
        email: formData.email
      };

      await campaignService.createCampaign(campaignPayload);

      setSuccess('Campanha criada com sucesso!');
      resetForm();
      
    } catch (err) {
      console.error('Erro ao criar campanha:', err);
      setError(err.message || 'Erro ao criar campanha');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      groupId: '',
      templateId: '',
      startDate: '',
      endDate: '',
      sendTime: '',
      subjectText: '',
      titleText: '',
      bodyText: '',
      buttonText: '',
      email: ''
    });
    setSelectedTemplate(null);
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

        {error && <div className="errorMessage">{error}</div>}
        {success && <div className="successMessage">{success}</div>}

        {/* Formulário usando componente separado */}
        <CampanhaForm
          formData={formData}
          groups={groups}
          templates={templates}
          selectedTemplate={selectedTemplate}
          loading={loading}
          onInputChange={handleInputChange}
        />

        {/* Preview do Template */}
        <CampanhaTemplate
          selectedTemplate={selectedTemplate}
          formData={formData}
        />

        <div className="actionButtons">
          <button 
            className="btnCancel" 
            onClick={resetForm}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            className="btnCreate" 
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