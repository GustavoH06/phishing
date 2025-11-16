import React, { useState, useEffect } from 'react';
import { BsFileEarmarkPlay, BsFileEarmarkRuled, BsFileEarmarkCheck } from 'react-icons/bs';
import CampaignCardDeadline from './CampaignCardDeadline';
import CampaignCardRecent from './CampaignCardRecent';
import CampaignList from '../../Modules/CampaignList/CampaignList';
import { campaignService } from '../../services/campaignService';
import './home.css';

function Home(){
    const [campaignStats, setCampaignStats] = useState({
        active: 0,
        total: 0,
        finished: 0
    });
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        loadCampaignStats();
    }, [refreshTrigger]);

    const loadCampaignStats = async () => {
        try {
            setLoading(true);
            const response = await campaignService.getCampaigns();
            const campaigns = response.items || [];
            
            const activeCampaigns = campaigns.filter(camp => camp.status === 'a').length;
            const finishedCampaigns = campaigns.filter(camp => camp.status === 'f').length;
            const totalCampaigns = campaigns.length;
            
            setCampaignStats({
                active: activeCampaigns,
                total: totalCampaigns,
                finished: finishedCampaigns
            });
            
        } catch (err) {
            console.error('Erro ao carregar estatísticas:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return(
        <div className="mainContainer">
            <div className="hSidenav">
            </div>

            <div className="hContent">
                <div className="hSection left">
                    <div className="generalView">
                        <h2>Visão Geral</h2>
                        <div className="campanhaInfo">
                            <div className="cItem">
                                <div className='campanhaIcon' style={{ backgroundColor: "#B6DDF0" }}> 
                                    <BsFileEarmarkPlay/>
                                </div>
                                <h4>Campanhas Ativas</h4>
                                <h3>{loading ? '...' : campaignStats.active}</h3>
                            </div>

                            <div className="cItem">
                                <div className="campanhaIcon" style={{ backgroundColor: "#F0E4B6"}}>
                                    <BsFileEarmarkRuled/>
                                </div>
                                <h4>Total de Campanhas</h4>
                                <h3>{loading ? '...' : campaignStats.total}</h3>
                            </div>

                            <div className="cItem">
                                <div className="campanhaIcon" style={{ backgroundColor: "#F0B6C8"}}>
                                    <BsFileEarmarkCheck/>
                                </div>
                                <h4>Campanhas Finalizadas</h4>
                                <h3>{loading ? '...' : campaignStats.finished}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="campaign">
                        <div className="campaignHeader">
                            <h2>Campanhas</h2>
                            <button 
                                className="btn-refresh" 
                                onClick={handleRefresh}
                                disabled={loading}
                            >
                                {loading ? 'Atualizando...' : 'Atualizar'}
                            </button>
                        </div>
                        <CampaignList refreshTrigger={refreshTrigger}/>
                    </div>
                </div>
                
                <div className="hSection right">
                    <div className="cardContainer">
                        <CampaignCardRecent refreshTrigger={refreshTrigger}/>
                        <CampaignCardDeadline refreshTrigger={refreshTrigger}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;