import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title
        document.title = title;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        // Update Canonical Tag
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }

        // Determine canonical URL
        // If explicit canonical is provided, use it.
        // Otherwise, construct it from the current path.
        // Since we want the home page to be exactly 'https://burrellnco.com/', we handle the root case.
        let canonicalUrl = canonical;
        if (!canonicalUrl) {
            const path = location.pathname === '/' ? '' : location.pathname;
            canonicalUrl = `https://burrellnco.com${path}`;
        }

        canonicalLink.setAttribute('href', canonicalUrl);

    }, [title, description, canonical, location]);

    return null;
};
