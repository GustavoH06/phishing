import GroupList from '../../Modules/GroupList/GroupList';
import './grupoCriar.css';

function GrupoCriar(){
    return(
    <div className="mainContainer">
        <div className="gCriarContainer">
            <div className="campanhaTitle">
                <h2>Grupos</h2>
                <span className="btn-novo-grupo">Novo Grupo</span>
            </div>
            
            <div className="gSectionContainer">
                <div className="gCriarSection left">
                    <div className="gFilterContainer">
                        <div className="gFilterColumn">
                          <input type="text" placeholder="Id" />
                          <input type="text" placeholder="Status" />
                        </div>

                        <div className="gFilterColumn">
                          <input type="text" placeholder="Nome" />
                          <div className="gFilterButtons">
                            <button className="btn-search">Pesquisar</button>
                            <button className="btn-clear">Limpar Filtros</button>
                          </div>
                        </div>
                    </div>

                    <div className="userList">
                        <GroupList/>
                    </div>
                </div>
                
                <div className="gCriarSection right">
                    <div className="dadosGrupoSection">
                        <h3>Dados do Grupo</h3>
                        
                        <div className="formGrupo">
                            <div className="formGroup">
                                <label>Nome do Grupo</label>
                                <input type="text" placeholder="Digite o nome do grupo" />
                            </div>
                            
                            <div className="formGroup">
                                <label>Descrição do Grupo</label>
                                <textarea placeholder="Digite a descrição do grupo" rows="3" />
                            </div>
                        </div>
                    </div>

                    <div className="membrosSection">
                        <h3>Membros do Grupo</h3>
                        
                        <div className="membrosHeader">
                            <span>Nome</span>
                            <span>E-mail</span>
                        </div>
                        
                        <div className="membrosList">
                            <div className="membroItem">
                                <span>Antonio Andrade Antunes</span>
                                <span>antonio@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Bruno Benjamin Bernardos</span>
                                <span>bruno@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Carol Carolina Cardoso</span>
                                <span>carol@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Daniel Denis Dutta</span>
                                <span>daniel@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Eduardo Estevão Esteves</span>
                                <span>dududeredu@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Felipe Fernandes Fagundes</span>
                                <span>felipe@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Gustavo Guedes Goodra</span>
                                <span>gustavo@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Heilas Humberto Helicoptero</span>
                                <span>heilas@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Isis Indeed Ivern</span>
                                <span>isis@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Jonathan Jobbestrella</span>
                                <span>jonathan@unipam.edu.br</span>
                            </div>
                            <div className="membroItem">
                                <span>Kauan Kuriha Kok</span>
                                <span>kauan@unipam.edu.br</span>
                            </div>
                        </div>
                    </div>

                    <div className="formActions">
                        <button className="btn-cancelar">Cancelar</button>
                        <button className="btn-criar">Criar Grupo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default GrupoCriar