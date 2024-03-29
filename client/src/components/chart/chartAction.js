import { useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

const ChartDate = (props) => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode);

    const chartOptions = {
        series: [
            {
                name: 'Action',
                data: props.tableau_action
            },
            {
                name: 'Société',
                data: props.tableau_societe
            }
        ],
        
         options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent',
                backgroundOpacity: 0.5,
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
            },
            grid: {
                show: false
            }
        }
    }

    return ( 
        <div className="card full-height">
            <Chart
                options={themeReducer === 'theme-mode-dark' ? {
                    ...chartOptions.options,
                    theme: { mode: 'dark' }
                } : {
                    ...chartOptions.options,
                    theme: { mode: 'light' }
                }}
                series={chartOptions.series}
                type='line'
                height='100%'
            />
        </div>
    );
}

export default ChartDate;
