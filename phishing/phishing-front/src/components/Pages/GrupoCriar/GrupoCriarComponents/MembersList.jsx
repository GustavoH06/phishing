import React from 'react';
import './grupoCriarComponents.css';

function MembersList({ groupMembers, onAddMember, onRemoveMember }) {
  const renderMembersList = () => {
    if (groupMembers.length === 0) {
      return (
        <div className="noMembers">
          <span>Nenhum membro adicionado ao grupo</span>
        </div>
      );
    }

    return groupMembers.map((member) => (
      <div key={member.id} className="membroItem">
        <span className="memberName">{member.name}</span>
        <span className="memberEmail">{member.email}</span>
        <div className="memberActions">
          <button 
            className="btnRemoveMember"
            onClick={() => onRemoveMember(member.id)}
            title="Remover membro"
          >
            X
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="membrosSection">
      <div className="membrosHeader">
        <h3>Membros do Grupo</h3>
        <div className="membrosHeaderActions">
          <button 
            className="btnAddMember"
            onClick={onAddMember}
            title="Adicionar membro"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="membrosListContainer">
        <div className="membrosListHeader">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Ações</span>
        </div>
        
        <div className="membrosList">
          {renderMembersList()}
        </div>
      </div>
    </div>
  );
}

export default MembersList;