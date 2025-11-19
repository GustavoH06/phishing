import React from 'react';
import '../campanhaCriar.css';

function CampanhaTemplate({ selectedTemplate, formData }) {
  const renderEmailPreview = () => {
    if (!selectedTemplate?.code) {
      return (
        <div className="previewPlaceholder">
          Selecione um template para ver a prévia do email
        </div>
      );
    }

    const previewHtml = selectedTemplate.code
      .replace(/{{title}}/g, formData.titleText || 'Título do Email')
      .replace(/{{body}}/g, formData.bodyText || 'Conteúdo do email...')
      .replace(/{{name}}/g, 'Nome do Usuário')
      .replace(/{{link}}/g, '#')
      .replace(/{{button_text}}/g, formData.buttonText || 'Clique Aqui');

    return (
      <div 
        className="emailPreviewContent"
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    );
  };

  return (
    <div className="sectionContainer">
      <h3 className="sectionTitle">Prévia do E-mail</h3>
      <div className="sectionBox previewBox">
        <div className="emailPreview">
          {renderEmailPreview()}
        </div>
      </div>
    </div>
  );
}

export default CampanhaTemplate;