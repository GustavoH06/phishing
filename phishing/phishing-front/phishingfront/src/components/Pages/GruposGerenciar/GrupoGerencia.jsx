import GroupList from '../../Modules/GroupList/GroupList';
import './grupoGerencia.css';

function GrupoGerencia(){
    return(
    <div className="mainContainer">
        <div className="gGerenciarContainer">
            <div className="campanhaTitle">
                <h2>Grupos</h2>
                <span className="btn-novo-grupo">Novo Grupo</span>
            </div>
            
            <div className="gSectionContainer">
                <div className="gGerenciarSection left">
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
                
                <div className="gGerenciarSection right">
                    <div className="dadosGrupoSection">
                        <div className="infoGrupo">
                            <div className="infoHeader">
                                <div className="infoId">
                                    <span className="label">Id:</span>
                                    <span className="value">11</span>
                                </div>
                                <div className="infoNome">
                                    <span className="label">Funcionários Unipam</span>
                                </div>
                                <div className="infoStatus">
                                    <span className="status-badge">Em campanha</span>
                                </div>
                            </div>
                            
                            <div className="infoDescricao">
                                <p>Funcionários do setor administrativo do Unipam, atualizado em 02-12-2025</p>
                                <p>Não contem o Robertinho e a Claudinha</p>
                            </div>
                        </div>
                    </div>

                    <div className="membrosSection">
                        <h3>Membros do Grupo</h3>
                        
                        <div className="membrosListContainer">
                            <div className="membrosListHeader">
                                <span>Id</span>
                                <span>Nome</span>
                                <span>E-mail</span>
                            </div>
                            
                            <div className="membrosList">
                                <div className="membroListItem">
                                    <span>1</span>
                                    <span>Antonio Andrade Antunes</span>
                                    <span>antonio@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>2</span>
                                    <span>Bruno Benjamin Bernardes</span>
                                    <span>bruno@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>3</span>
                                    <span>Carol Carolina Cardoso</span>
                                    <span>carol@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>4</span>
                                    <span>Daniel Denis Dutra</span>
                                    <span>daniel@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>5</span>
                                    <span>Eduardo Edilson Esteves</span>
                                    <span>dududeedu@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>6</span>
                                    <span>Felipe Fernandes Fagundes</span>
                                    <span>felipe@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>7</span>
                                    <span>Gustavo Guedes Goodra</span>
                                    <span>gustavo@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>8</span>
                                    <span>Heilas Humberto Helicóptero</span>
                                    <span>heilas@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>9</span>
                                    <span>Isis Indeed Ivern</span>
                                    <span>isis@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>10</span>
                                    <span>Jonathan Jobbestrela</span>
                                    <span>jonathan@unipam.edu.br</span>
                                </div>
                                <div className="membroListItem">
                                    <span>11</span>
                                    <span>Kauan Kuriha Kok</span>
                                    <span>kauan@unipam.edu.br</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="formActions">
                        <button className="btn-editar">Editar Grupo</button>
                        <button className="btn-excluir">Excluir Grupo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default GrupoGerencia