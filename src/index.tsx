import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CustomThemeProvider} from './theme/ThemeContext';
import reportWebVitals from "./reportWebVitals";
import './i18n'; // Initialize i18n
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CustomThemeProvider>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </CustomThemeProvider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
