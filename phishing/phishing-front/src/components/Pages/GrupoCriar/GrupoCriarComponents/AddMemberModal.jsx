import React, { useState } from 'react';
import './grupoCriarComponents.css';

function AddMemberModal({ isOpen, onClose, onAddMember }) {
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    personCode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!memberForm.name.trim() || !memberForm.email.trim() || !memberForm.personCode.trim()) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    onAddMember({
      name: memberForm.name,
      email: memberForm.email,
      personCode: memberForm.personCode
    });

    setMemberForm({ name: '', email: '', personCode: '' });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setMemberForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h3>Adicionar Membro</h3>
          <button 
            className="btnCloseModal"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="memberForm">
          <div className="formGroup">
            <label>Nome *</label>
            <input
              type="text"
              value={memberForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Digite o nome do membro"
              required
            />
          </div>
          
          <div className="formGroup">
            <label>E-mail *</label>
            <input
              type="email"
              value={memberForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Digite o e-mail do membro"
              required
            />
          </div>
          
          <div className="formGroup">
            <label>Código da Pessoa *</label>
            <input
              type="text"
              value={memberForm.personCode}
              onChange={(e) => handleInputChange('personCode', e.target.value)}
              placeholder="Digite o código único da pessoa"
              required
            />
          </div>
          
          <div className="modalActions">
            <button 
              type="button"
              className="btnCancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="btnSave"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;