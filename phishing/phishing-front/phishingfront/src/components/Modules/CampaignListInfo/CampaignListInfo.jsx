import './campaignListInfo.css'

function CampaignListInfo(){
    return(
        <>
            <div className="cGerenciaHeader">
                <span>Id</span>
                <span>Nome</span>
                <span>Grupo</span>
                <span>Template</span>
                <span>Data Disparo</span>
                <span>Hora Disparo</span>
                <span>Data Fim</span>
                <span>Status</span>
            </div>

            <div className="cGerenciaList">
                <div className="cGerenciaCard">
                    <span>21</span>
                    <span>Cupom Ifood Unipam 3 - dez 2025</span>
                    <span>Funcionarios Unipam</span>
                    <span>Ifood 1</span>
                    <span>02-12-2025</span>
                    <span>16:30</span>
                    <span>25-12-2025</span>
                    <span>Ativo</span>
                </div>

                <div className="cGerenciaCard">
                    <span>22</span>
                    <span>Cupom Ifood Unipam 3 - dez 2025</span>
                    <span>Funcionarios Unipam</span>
                    <span>Ifood 1</span>
                    <span>02-12-2025</span>
                    <span>16:30</span>
                    <span>25-12-2025</span>
                    <span>Ativo</span>
                </div>
            </div>
        </>
    )
}

export default CampaignListInfo