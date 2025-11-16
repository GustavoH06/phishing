import './groupList.css'

function GroupList(){
    return(
        <div className="campaignListContainer">
            <div className="cardListHeader">
                <span>Id</span>
                <span>Nome</span>
                <span>Em Campanha</span>
                <span></span> {/* COLUNA EXTRA PARA A SETA */}
            </div>

            <div className="campaignList">
                <div className="campaignListCard">
                    <span>11</span>
                    <span>Funcionários Unipam</span>
                    <span>Sim</span>
                    <span>›</span> {/* SETA ADICIONADA */}
                </div>

                <div className="campaignListCard">
                    <span>10</span>
                    <span>Alunos Sistemas</span>
                    <span>Não</span>
                    <span>›</span> {/* SETA ADICIONADA */}
                </div>
            </div>
        </div>

    )
}

export default GroupList