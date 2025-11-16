import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../../services/campaignService';
import './campaignList.css';

const CampaignList = ({ onCampaignSelect, selectedCampaignId, refreshTrigger }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCampaignClick = (campaign) => {
    navigate(`/campanha/${campaign.id}`);
  };

  useEffect(() => {
    loadCampaigns();
  }, [refreshTrigger]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Carregando campanhas...');
      const response = await campaignService.getCampaigns();
      
      // Pega os itens
      const campaignsData = response.items || response;
      setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
      
      console.log('Campanhas carregadas:', campaignsData);
      
    } catch (err) {
      console.error('Erro ao carregar campanhas:', err);
      setError(err.message);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'a': { text: 'Ativo', color: '#26BAB3', borderColor: '#26BAB3' },
      'i': { text: 'Inativo', color: '#B8B8B8', borderColor: '#B8B8B8' },
      'f': { text: 'Finalizado', color: '#BA4D26', borderColor: '#BA4D26' }
    };
    
    const config = statusConfig[status] || { text: 'Desconhecido', color: '#666', borderColor: '#666' };
    
    return (
      <span 
        style={{ 
          border: `1px solid ${config.borderColor}`,
          color: config.color,
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          justifySelf: 'start',
          alignSelf: 'center'
        }}
      >
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="campaignListContainer">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando campanhas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="campaignListContainer">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="cardListHeader">
        <span>Id</span>
        <span>Nome</span>
        <span>Grupo</span>
        <span>Template</span>
        <span>Status</span>
      </div>

      <div className="campaignList">
        {campaigns.length === 0 ? (
          <div className="empty-state">
            {error ? 'Erro ao carregar campanhas' : 'Nenhuma campanha encontrada'}
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className={`campaignListCard ${selectedCampaignId === campaign.id ? 'selected' : ''}`}
              onClick={() => handleCampaignClick(campaign)}
              style={{ cursor: 'pointer' }}
            >
              <span>{campaign.id}</span>
              <span>{campaign.name}</span>
              <span>{campaign.group?.name || 'N/A'}</span>
              <span>{campaign.template?.name || 'N/A'}</span>
              {getStatusBadge(campaign.status)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignList;