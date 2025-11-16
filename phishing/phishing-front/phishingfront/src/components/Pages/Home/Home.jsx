import { BsFileEarmarkPlay, BsFileEarmarkRuled, BsFileEarmarkCheck, BsPeople, BsGrid1X2 } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import authService from '../../../services/authService';
import CampaignCardDeadline from './CampaignCardDeadline';
import CampaignCardRecent from './CampaignCardRecent';
import CampaignList from '../../Modules/CampaignList/CampaignList';
import './home.css';

function Home(){
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Buscar informações do usuário ao carregar o componente
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        console.log('Usuário atual:', currentUser);
        console.log('É admin?', authService.isAdmin());
    }, []);

    const handleLogout = () => {
        authService.logout();
    };

    return(
        <div className="mainContainer">
            {/* Adicionando info do usuário no topo para teste */}
            <div className="user-info" style={{
                background: '#f8f9fa', 
                padding: '10px', 
                marginBottom: '20px', 
                borderRadius: '5px',
                border: '1px solid #dee2e6'
            }}>
                <p><strong>Usuário:</strong> {user?.name || 'Carregando...'}</p>
                <p><strong>Admin:</strong> {authService.isAdmin() ? 'Sim' : 'Não'}</p>
                <button 
                    onClick={handleLogout}
                    style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    Sair
                </button>
            </div>

            <div className="hContent">
                <div className="hSection left">
                    <div className="generalView">
                        <h2>Visão Geral</h2>
                        <div className="campanhaInfo">
                            <div className="cItem">
                                <div className='campanhaIcon ' style={{ backgroundColor: "#B6DDF0" }}> 
                                    <BsFileEarmarkPlay/>
                                </div>
                                <h4>Campanhas Ativas</h4>
                                <h3>3</h3>
                            </div>

                            <div className="cItem" >
                                <div className="campanhaIcon" style={{ backgroundColor: "#F0E4B6"}}>
                                    <BsFileEarmarkRuled/>
                                </div>
                                <h4>Total de Campanhas</h4>
                                <h3>3</h3>
                            </div>

                            <div className="cItem" >
                                <div className="campanhaIcon" style={{ backgroundColor: "#F0B6C8"}}>
                                    <BsFileEarmarkCheck/>
                                </div>
                                <h4>Campanhas Finalizadas</h4>
                                <h3>3</h3>
                            </div>
                        </div>
                    </div>

                    <div className="campaign">
                        <h2>Campanhas</h2>
                        <CampaignList/>
                    </div>
                </div>
                
                <div className="hSection right">
                    <div className="cardContainer">
                        <CampaignCardRecent/>
                        <CampaignCardDeadline/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home