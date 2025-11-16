// src/Pages/Home/CampaignCardDeadline.js
import React, { useState, useEffect } from 'react';
import { BsPeople, BsGrid1X2 } from 'react-icons/bs';
import { campaignService } from '../../services/campaignService';
import Piechart from './Piechart';

function CampaignCardDeadline({ refreshTrigger }) {
    const [upcomingCampaign, setUpcomingCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUpcomingCampaign();
    }, [refreshTrigger]);

    const loadUpcomingCampaign = async () => {
        try {
            setLoading(true);
            const response = await campaignService.getCampaigns();
            const campaigns = response.items || [];
            
            const activeCampaigns = campaigns.filter(camp => camp.status === 'a');
            const sortedCampaigns = activeCampaigns.sort((a, b) => 
                new Date(a.end_date) - new Date(b.end_date)
            );
            
            const nearestDeadline = sortedCampaigns[0] || null;
            setUpcomingCampaign(nearestDeadline);
        } catch (err) {
            console.error('Erro ao carregar campanha com prazo:', err);
            setUpcomingCampaign(null);
        } finally {
            setLoading(false);
        }
    };

    const getDaysUntilDeadline = (endDate) => {
        if (!endDate) return 'N/A';
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? `${diffDays} dias` : 'Expirado';
    };

    if (loading) {
        return (
            <div className="campaignLast">
                <h2>Campanha Próxima ao Fim</h2>
                <div className="cCardInfo">
                    <div className="loading-card">Carregando...</div>
                </div>
            </div>
        );
    }

    if (!upcomingCampaign) {
        return (
            <div className="campaignLast">
                <h2>Campanha Próxima ao Fim</h2>
                <div className="cCardInfo">
                    <div className="no-data">Nenhuma campanha ativa</div>
                </div>
            </div>
        );
    }

    return (
        <div className="campaignLast">
            <h2>Campanha Próxima ao Fim</h2>
        
            <div className="cCardInfo">
                <h3>{upcomingCampaign.name}</h3>
        
                <div className="cLastSection">
        
                    <div className="cLastSectionUpper">
                        <div className="cLastSection left">
                            <div className="cLastGroup">
                                <BsPeople />
                                <span>{upcomingCampaign.group?.name || 'N/A'}</span>
                            </div>
            
                            <div className="cLastTemplate">
                                <BsGrid1X2 />
                                <span>{upcomingCampaign.template?.name || 'N/A'}</span>
                            </div>
                        </div>
            
                        <div className="cLastSection right">
                            <Piechart />
                        </div>
                    </div>
            
                    <div className="cLastSectionBottom">
                        <div className="cLastSection left">
                            <span className="cLastDeadline">
                                Finaliza em:
                            </span>
                            <span className='cardCounter'>
                                {getDaysUntilDeadline(upcomingCampaign.end_date)}
                            </span>
                        </div>
            
                        <div className="cLastSection right">
                            <span className="cLastConversion">
                                Data Fim:
                            </span>
                            <span className='cardCounter'>
                                {upcomingCampaign.end_date || 'N/A'}
                            </span>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
    );
}

export default CampaignCardDeadline;