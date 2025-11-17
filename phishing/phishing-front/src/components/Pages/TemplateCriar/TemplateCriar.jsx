import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateList from '../../Modules/TemplateList/TemplateList';
import { templateService } from '../../services/templateService';
import './templateCriar.css';

function TemplateCriar() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Carregar o script do TinyMCE
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/8/tinymce.min.js';
    script.referrerPolicy = 'origin';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // Inicializar o editor após o script carregar
      if (window.tinymce) {
        window.tinymce.init({
          selector: '#template-editor',
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'visualchars', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | bold italic underline strikethrough | fontfamily fontsize | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | help',
          content_style: `
            body { 
              font-family: Arial, sans-serif; 
              font-size: 14px; 
              line-height: 1.6;
              margin: 0;
              padding: 10px;
              background-color: #f9f9f9;
            }
            .mce-content-body {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #e50914; font-size: 28px; margin-bottom: 20px; }
            h2 { color: #333; font-size: 22px; margin-bottom: 15px; }
            p { margin-bottom: 15px; color: #333; }
            a.btn { 
              background-color: #e50914; 
              color: white; 
              padding: 12px 30px; 
              text-decoration: none; 
              border-radius: 4px; 
              display: inline-block;
              font-weight: bold;
            }
          `,
          branding: false,
          promotion: false,
          statusbar: false,
          setup: (editor) => {
            editorRef.current = editor;
            editor.on('init', () => {
              setEditorLoaded(true);
              if (formData.code) {
                editor.setContent(formData.code);
              }
            });
            editor.on('change', () => {
              handleInputChange('code', editor.getContent());
            });
          }
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (window.tinymce) {
        window.tinymce.remove('#template-editor');
      }
    };
  }, []);

  // Atualizar conteúdo do editor quando formData.code mudar
  useEffect(() => {
    if (editorRef.current && editorLoaded && formData.code) {
      editorRef.current.setContent(formData.code);
    }
  }, [formData.code, editorLoaded]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (template && template.id) {
      loadTemplateData(template.id);
    }
  };

  const loadTemplateData = async (templateId) => {
    try {
      const template = await templateService.getTemplateById(templateId);
      setFormData({
        name: template.name || '',
        desc: template.description || '',
        code: template.code || ''
      });
    } catch (err) {
      console.error('Erro ao carregar template:', err);
      setError('Erro ao carregar dados do template');
    }
  };

  const validateTemplate = (code) => {
    const requiredVariables = ['{{title}}', '{{body}}', '{{name}}', '{{link}}'];
    const missingVariables = requiredVariables.filter(variable => !code.includes(variable));
    
    if (missingVariables.length > 0) {
      return `Template deve conter todas as variáveis: ${missingVariables.join(', ')}`;
    }
    return null;
  };

  const handleCreateTemplate = async () => {
    if (!formData.name.trim()) {
      setError('Nome do template é obrigatório');
      return;
    }

    if (!formData.code.trim()) {
      setError('Conteúdo do template é obrigatório');
      return;
    }

    const validationError = validateTemplate(formData.code);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await templateService.createTemplate({
        name: formData.name,
        desc: formData.desc || '',
        code: formData.code
      });

      setSuccess('Template criado com sucesso!');
      setFormData({ name: '', desc: '', code: '' });
      setSelectedTemplate(null);
      
      setRefreshTrigger(prev => prev + 1);
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error('Erro ao criar template:', err);
      setError(err.message || 'Erro ao criar template');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({ name: '', desc: '', code: '' });
    setError('');
    setSuccess('');
    setSelectedTemplate(null);
  };

  const loadTemplateBase = () => {
    const baseTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f4f4; padding: 20px;">
  <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- CABEÇALHO - EDITÁVEL -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #e50914; margin-bottom: 20px;">
      <h1 style="color: #e50914; margin: 0; font-size: 28px;">{{title}}</h1>
    </div>
    
    <!-- CONTEÚDO PRINCIPAL - EDITÁVEL -->
    <div style="margin: 25px 0; color: #333;">
      <h2 style="color: #333; margin-bottom: 15px;">Olá {{name}},</h2>
      
      <!-- ÁREA EDITÁVEL PARA O CORPO DO EMAIL -->
      <div style="font-size: 16px; line-height: 1.6;">
        {{body}}
      </div>
      
      <!-- BOTÃO - EDITÁVEL -->
      <div style="text-align: center; margin: 25px 0;">
        <a href="{{link}}" style="display: inline-block; background-color: #e50914; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
          Clique Aqui
        </a>
      </div>
    </div>
    
    <!-- RODAPÉ - EDITÁVEL -->
    <div style="border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #999; text-align: center;">
      <p>Esta é uma mensagem automática, por favor não responda este email.</p>
    </div>
    
  </div>
</div>
    `.trim();

    setFormData(prev => ({
      ...prev,
      code: baseTemplate
    }));
    setError('');
  };

  const renderPreview = () => {
    if (!formData.code) {
      return (
        <div className="preview-placeholder">
          O preview do template será exibido aqui quando você criar o conteúdo
        </div>
      );
    }

    const previewHtml = formData.code
      .replace(/{{title}}/g, 'Título do Seu Email')
      .replace(/{{body}}/g, '<p>Este é o conteúdo principal do seu email. Use o editor acima para personalizar completamente esta área com textos, imagens, formatações e muito mais!</p><p>Você pode adicionar quantos parágrafos quiser e formatar o texto como desejar.</p>')
      .replace(/{{name}}/g, 'Nome do Destinatário')
      .replace(/{{link}}/g, '#');

    return (
      <div 
        className="template-preview"
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    );
  };

  return (
    <div className="mainContainer">
      <div className="gCriarContainer">
        <div className="campanhaTitle">
          <h2>Criar Template</h2>
          <button 
            className="btn-novo-grupo"
            onClick={() => navigate('/templates')}
          >
            Voltar para Templates
          </button>
        </div>
        
        <div className="gSectionContainer">
          <div className="gCriarSection left">
            <div className="userList">
              <TemplateList 
                onTemplateSelect={handleTemplateSelect}
                selectedTemplateId={selectedTemplate?.id}
                refreshTrigger={refreshTrigger}
              />
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

              <div className="variables-info">
                <h4>Variáveis Disponíveis:</h4>
                <div className="variables-grid">
                  <div className="variable-item">
                    <code className="variable-code">{'{{title}}'}</code>
                    <span>Título do email</span>
                  </div>
                  <div className="variable-item">
                    <code className="variable-code">{'{{body}}'}</code>
                    <span>Corpo do email</span>
                  </div>
                  <div className="variable-item">
                    <code className="variable-code">{'{{name}}'}</code>
                    <span>Nome do destinatário</span>
                  </div>
                  <div className="variable-item">
                    <code className="variable-code">{'{{link}}'}</code>
                    <span>Link para clique</span>
                  </div>
                </div>
                <p className="variables-warning">
                  <strong>Importante:</strong> Todas as variáveis devem estar presentes no template!
                </p>
              </div>
              
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
                  <div className="editor-header">
                    <label>Conteúdo do Template *</label>
                    <button 
                      type="button" 
                      onClick={loadTemplateBase}
                      className="btn-exemplo"
                      disabled={!editorLoaded}
                    >
                      Template Base
                    </button>
                  </div>
                  
                  <textarea 
                    id="template-editor"
                    style={{ display: 'none' }}
                  />
                  
                  {!editorLoaded && (
                    <div className="editor-loading">
                      <p>Carregando editor...</p>
                    </div>
                  )}
                  
                  <div className="editor-help">
                    <p><strong>Como usar:</strong></p>
                    <ul>
                      <li>Use o botão "Template Base" para começar com uma estrutura básica</li>
                      <li>Personalize o layout, cores, fontes e conteúdo como desejar</li>
                      <li>Mantenha as variáveis <code>{'{{title}}'}</code>, <code>{'{{body}}'}</code>, <code>{'{{name}}'}</code> e <code>{'{{link}}'}</code> nos locais apropriados</li>
                      <li>Estas variáveis serão preenchidas automaticamente quando criar uma campanha</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="previewSection">
              <h3>Preview do Template</h3>
              
              <div className="previewContainer">
                {renderPreview()}
              </div>
            </div>

            <div className="formActions">
              <button 
                className="btn-cancelar" 
                onClick={handleClearForm}
                disabled={loading}
              >
                Limpar
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