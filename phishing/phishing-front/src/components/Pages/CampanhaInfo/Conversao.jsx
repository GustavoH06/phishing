import Piechart from "../Home/Piechart";
import "./campanhaInfo.css";

function Conversao() {
    return (
        <div className="conversaoContainer">
        <div className="conversaoSection left">
            <div className="conversaoTaxa">
            <h2>Taxa de Conversão</h2>
            <span>0%</span>
            </div>
            <div className="convesaoMedia">
            <h2>Total de Clicks</h2>
            <span>0/0</span>
            </div>
        </div>
        <div className="conversaoSection right">
            <div className="conversaoChart">
            <Piechart width="160%" height="160%" conversion={0} />
            </div>
        </div>
        
        </div>
    );
}

export default Conversao;