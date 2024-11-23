import CssBaseline from '@mui/material/CssBaseline';
import ReactWeather, { useVisualCrossing } from 'react-open-weather';

import AppTheme from '../material-ui/shared-theme/AppTheme';

import Menu from "./components/Menu.tsx";
import Panel from "./components/Panel.tsx";
import { useState } from 'react';

const API_KEY = import.meta.env.VITE_VS_API_KEY;

const ciudades = {
    lima: {nombre: 'Lima', coordenadas: {lat: -12.01, lon: -77.07}},
    arequipa: {nombre: 'Arequipa', coordenadas: {lat: -16.38, lon: -71.56}},
    puno: {nombre: 'Puno', coordenadas: {lat: -15.81, lon: -70.03}},
    cusco: {nombre: 'Cusco', coordenadas: {lat: -13.52, lon: -71.97}},
    huancayo: {nombre: 'Huancayo', coordenadas: {lat: -12.07, lon: -75.26}},
    tingoMaria: {nombre: 'Tingo María', coordenadas: {lat: -9.3, lon: -76}},
    trujillo: {nombre: 'Trujillo', coordenadas: {lat: -8.15, lon: -79.05}},
    piura: {nombre: 'Piura', coordenadas: {lat: -5.2, lon: -80.69}},
    iquitos: {nombre: 'Iquitos', coordenadas: {lat: -3.77, lon: -73.26}}
};

export default function Home(props: { disableCustomTheme?: boolean }) {

    const [ciudad, setCiudad] = useState(ciudades.lima);

    const { data, isLoading, errorMessage } = useVisualCrossing({
        key: API_KEY,
        lat: ciudad.coordenadas.lat,
        lon: ciudad.coordenadas.lon,
        lang: 'es',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <Menu />
            <div style={{paddingTop: 64, width: '100%'}}>
                <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={ciudad.nombre}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
                />
            </div>
            <Panel ciudades={ciudades} onChange={setCiudad} />
        </AppTheme>
    );
}
