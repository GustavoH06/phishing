import React from 'react';
import '../campanhaCriar.css';

function CampanhaForm({ 
  formData, 
  groups, 
  templates, 
  selectedTemplate,
  loading, 
  onInputChange 
}) {
  
  const FormField = ({ label, type = 'text', value, onChange, placeholder, disabled, field, options, rows }) => {
    if (type === 'select') {
      return (
        <div className="formGroup">
          <label>{label}</label>
          <select 
            className="formControl"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={disabled}
          >
            <option value="">Selecione...</option>
            {options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="formGroup">
          <label>{label}</label>
          <textarea 
            className="formControl"
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={disabled}
          />
        </div>
      );
    }

    return (
      <div className="formGroup">
        <label>{label}</label>
        <input 
          type={type}
          className="formControl"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          disabled={disabled}
        />
      </div>
    );
  };

  return (
    <>
      {/* Dados da Campanha */}
      <div className="sectionContainer">
        <h3 className="sectionTitle">Dados da Campanha</h3>
        <div className="sectionBox">
          <div className="formSingleColumn">
            <FormField
              label="Nome da Campanha *"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Campanha Inverno 2025"
              disabled={loading}
              field="name"
            />

            <FormField
              label="Grupo *"
              type="select"
              value={formData.groupId}
              onChange={onInputChange}
              disabled={loading}
              field="groupId"
              options={groups}
            />

            <FormField
              label="Template *"
              type="select"
              value={formData.templateId}
              onChange={onInputChange}
              disabled={loading}
              field="templateId"
              options={templates}
            />

            <FormField
              label="E-mail do Remetente *"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="remetente@empresa.com"
              disabled={loading}
              field="email"
            />

            <div className="dateRow">
              <FormField
                label="Data Início *"
                type="date"
                value={formData.startDate}
                onChange={onInputChange}
                disabled={loading}
                field="startDate"
              />

              <FormField
                label="Data Fim *"
                type="date"
                value={formData.endDate}
                onChange={onInputChange}
                disabled={loading}
                field="endDate"
              />
            </div>

            <FormField
              label="Hora do Disparo *"
              type="time"
              value={formData.sendTime}
              onChange={onInputChange}
              disabled={loading}
              field="sendTime"
            />
          </div>
        </div>
      </div>

      {/* Configuração do Template */}
      <div className="sectionContainer">
        <h3 className="sectionTitle">
          Configurar Template {selectedTemplate && `- ${selectedTemplate.name}`}
        </h3>
        <div className="sectionBox">
          <div className="formSingleColumn">
            <FormField
              label="Assunto do e-mail *"
              value={formData.subjectText}
              onChange={onInputChange}
              placeholder="Seu pagamento está atrasado"
              disabled={loading}
              field="subjectText"
            />

            <FormField
              label="Título do e-mail *"
              value={formData.titleText}
              onChange={onInputChange}
              placeholder="Conta Suspensa"
              disabled={loading}
              field="titleText"
            />

            <FormField
              label="Corpo do e-mail *"
              type="textarea"
              rows={6}
              value={formData.bodyText}
              onChange={onInputChange}
              placeholder="Digite o conteúdo do e-mail..."
              disabled={loading}
              field="bodyText"
            />

            <FormField
              label="Texto do Botão"
              value={formData.buttonText}
              onChange={onInputChange}
              placeholder="ATUALIZAR AQUI"
              disabled={loading}
              field="buttonText"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CampanhaForm;