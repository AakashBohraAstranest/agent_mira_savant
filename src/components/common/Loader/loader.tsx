import React, { useContext } from 'react';
import { LoaderContext } from '../../../services/LoaderContext';
import './loader.css'; 

const Loader = () => {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error('LoaderContext must be used within a LoaderProvider');
    }

    const { loading } = context;

    if (!loading) return null;

    return (
        <div className="loader-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
