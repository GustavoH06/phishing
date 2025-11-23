// src/Modules/Home/Piechart.jsx
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Piechart({ conversion = 0, total = 100, clicked = 0 }) {
    const clickedValue = clicked;
    const notClickedValue = total - clicked;
    
    const chartData = [
        { 
            id: 0, 
            value: clickedValue, 
            label: `Clicados (${clickedValue})`,
            color: '#26BAB3'
        },
        { 
            id: 1, 
            value: notClickedValue, 
            label: `Nao Clicados (${notClickedValue})`,
            color: '#B8B8B8'
        },
    ].filter(item => item.value > 0);

    // Se não há dados, mostra um estado vazio
    if (total === 0) {
        return (
            <div style={{ 
                height: 140, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
            }}>
                Nenhum dado disponivel
            </div>
        );
    }

    return (
        <PieChart
            series={[
                {
                    data: chartData,
                    highlightScope: { fade: 'global', highlight: 'item' },
                },
            ]}
            {...pieParams}
        />
    );
}

const pieParams = {
    height: 140,
    margin: { right: 5 },
    hideLegend: true,
};