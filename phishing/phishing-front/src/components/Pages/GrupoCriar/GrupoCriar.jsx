import React, { useState } from 'react';
import GroupList from './GrupoCriarComponents/GroupList';
import GroupForm from './GrupoCriarComponents/GroupForm';
import MembersList from './GrupoCriarComponents/MembersList';
import AddMemberModal from './GrupoCriarComponents/AddMemberModal';
import { groupService } from '../../services/groupService';
import './grupoCriar.css';

function GrupoCriar() {
  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  });
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddMember = (memberData) => {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      email: memberData.email,
      personCode: memberData.personCode
    };

    setGroupMembers(prev => [...prev, newMember]);
  };

  const handleRemoveMember = (memberId) => {
    setGroupMembers(prev => prev.filter(member => member.id !== memberId));
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

      await groupService.createGroup({
        name: formData.name,
        description: formData.desc || '',
        targets: groupMembers.map(member => ({
          name: member.name,
          email: member.email,
          personCode: member.personCode
        }))
      });

      setSuccess('Grupo criado com sucesso!');
      setFormData({ name: '', desc: '' });
      setGroupMembers([]);
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
    setGroupMembers([]);
    setError('');
    setSuccess('');
  };

  return (
    <div className="mainContainer">
      <div className="hSidenav"></div>

      <div className="gCriarContainer">
        <div className="campanhaTitle">
          <h2>Grupos</h2>
          <span className="btnNovoGrupo">Novo Grupo</span>
        </div>
        
        <div className="gSectionContainer">
          <div className="gCriarSection left">
            <div className="userList">
              <GroupList refreshTrigger={refreshTrigger} />
            </div>
          </div>
          
          <div className="gCriarSection right">
            <GroupForm 
              formData={formData}
              loading={loading}
              onInputChange={handleInputChange}
              error={error}
              success={success}
            />

            <MembersList 
              groupMembers={groupMembers}
              onAddMember={() => setShowAddMemberModal(true)}
              onRemoveMember={handleRemoveMember}
            />

            <div className="formActions">
              <button 
                className="btnCancelar" 
                onClick={handleClearForm}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                className="btnCriar" 
                onClick={handleCreateGroup}
                disabled={loading || !formData.name.trim()}
              >
                {loading ? 'Criando...' : 'Criar Grupo'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddMemberModal 
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
}

export default GrupoCriar;