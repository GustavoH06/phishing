import React, { useState, useEffect, useCallback } from 'react';
import { BsPeople, BsGrid1X2 } from 'react-icons/bs';
import { campaignService } from '../../services/campaignService';
import Piechart from './Piechart';

const EMPTY_STATE_MESSAGE = 'Nenhuma campanha ativa';

function CampaignCardDeadline({ refreshTrigger }) {
    const [upcomingCampaign, setUpcomingCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    //Calcula os dias até o final
    const getDaysUntilDeadline = useCallback((endDate) => {
        if (!endDate) return 'N/A';
        
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays > 0 ? `${diffDays} dias` : 'Expirado';
    }, []);

    //Carregar campanhas
    const loadUpcomingCampaign = useCallback(async () => {
        try {
            setLoading(true);
            const response = await campaignService.getCampaigns();
            const campaigns = response?.items || [];
            
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
    }, []);

    useEffect(() => {
        loadUpcomingCampaign();
    }, [loadUpcomingCampaign, refreshTrigger]);

    const renderContent = (content, fallback = 'N/A') => {
        return content || fallback;
    };

    //Formatar data
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return 'Data inválida';
        }
    };

    //Lidar com Loading
    const LoadingState = () => (
        <div className="campaignLast">
            <h2>Campanha Próxima ao Fim</h2>
            <div className="cCardInfo">
                <div className="loading-card">Carregando...</div>
            </div>
        </div>
    );

    //Lidar com Empty
    const EmptyState = () => (
        <div className="campaignLast">
            <h2>Campanha Próxima ao Fim</h2>
            <div className="cCardInfo">
                <div className="no-data">{EMPTY_STATE_MESSAGE}</div>
            </div>
        </div>
    );

    //Seção superior
    const CampaignUpperSection = ({ campaign }) => (
        <div className="cLastSectionUpper">
            <div className="cLastSection left">
                <div className="cLastGroup">
                    <BsPeople />
                    <span>{renderContent(campaign.group?.name)}</span>
                </div>
    
                <div className="cLastTemplate">
                    <BsGrid1X2 />
                    <span>{renderContent(campaign.template?.name)}</span>
                </div>
            </div>
    
            <div className="cLastSection right">
                <Piechart />
            </div>
        </div>
    );

    //Seção inferior
    const CampaignBottomSection = ({ campaign }) => (
        <div className="cLastSectionBottom">
            <div className="cLastSection left">
                <span className="cLastDeadline">
                    Finaliza em:
                </span>
                <span className='cardCounter'>
                    {getDaysUntilDeadline(campaign.end_date)}
                </span>
            </div>

            <div className="cLastSection right">
                <span className="cLastConversion">
                    Data Fim:
                </span>
                <span className='cardCounter'>
                    {formatDate(campaign.end_date)}
                </span>
            </div>
        </div>
    );

    //Seção principal
    const CampaignContent = ({ campaign }) => (
        <div className="campaignLast">
            <h2>Campanha Próxima ao Fim</h2>
        
            <div className="cCardInfo">
                <h3>{renderContent(campaign.name)}</h3>
        
                <div className="cLastSection">
                    <CampaignUpperSection campaign={campaign} />
                    <CampaignBottomSection campaign={campaign} />
                </div>
            </div>
        </div>
    );

    //Renderização condicional
    if (loading) {
        return <LoadingState />;
    }

    if (!upcomingCampaign) {
        return <EmptyState />;
    }

    return <CampaignContent campaign={upcomingCampaign} />;
}

export default CampaignCardDeadline;