import React, { useState, useEffect } from 'react';
import { BsPeople, BsGrid1X2 } from 'react-icons/bs';
import { campaignService } from '../../services/campaignService';
import Piechart from './Piechart';

function CampaignCardRecent({ refreshTrigger }) {
    const [recentCampaign, setRecentCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecentCampaign();
    }, [refreshTrigger]);

    const loadRecentCampaign = async () => {
        try {
            setLoading(true);
            const response = await campaignService.getCampaigns();
            const campaigns = response.items || [];
            
            const sortedCampaigns = campaigns.sort((a, b) => b.id - a.id);
            const mostRecent = sortedCampaigns[0] || null;
            
            setRecentCampaign(mostRecent);
        } catch (err) {
            console.error('Erro ao carregar campanha recente:', err);
            setRecentCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="campaignLast">
                <h2>Última Campanha Criada</h2>
                <div className="cCardInfo">
                    <div className="loading-card">Carregando...</div>
                </div>
            </div>
        );
    }

    if (!recentCampaign) {
        return (
            <div className="campaignLast">
                <h2>Última Campanha Criada</h2>
                <div className="cCardInfo">
                    <div className="no-data">Nenhuma campanha encontrada</div>
                </div>
            </div>
        );
    }

    return (
        <div className="campaignLast">
            <h2>Última Campanha Criada</h2>
        
            <div className="cCardInfo">
                <h3>{recentCampaign.name}</h3>
        
                <div className="cLastSection">
        
                    <div className="cLastSectionUpper">
                        <div className="cLastSection left">
                            <div className="cLastGroup">
                                <BsPeople />
                                <span>{recentCampaign.group?.name || 'N/A'}</span>
                            </div>
            
                            <div className="cLastTemplate">
                                <BsGrid1X2 />
                                <span>{recentCampaign.template?.name || 'N/A'}</span>
                            </div>
                        </div>
            
                        <div className="cLastSection right">
                            <Piechart />
                        </div>
                    </div>
            
                    <div className="cLastSectionBottom">
                        <div className="cLastSection left">
                            <span className="cLastDeadline">
                                Status:
                            </span>
                            <span className='cardCounter' style={{ 
                                color: recentCampaign.status === 'a' ? '#26BAB3' : 
                                       recentCampaign.status === 'f' ? '#BA4D26' : '#B8B8B8'
                            }}>
                                {recentCampaign.status === 'a' ? 'Ativo' : 
                                 recentCampaign.status === 'f' ? 'Finalizado' : 'Inativo'}
                            </span>
                        </div>
            
                        <div className="cLastSection right">
                            <span className="cLastConversion">
                                ID:
                            </span>
                            <span className='cardCounter'>
                                {recentCampaign.id}
                            </span>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    );
}

export default CampaignCardRecent;