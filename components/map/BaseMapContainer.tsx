'use client';

import dynamic from 'next/dynamic';


// Dynamically import the MapLandmark component with SSR disabled
const BaseMapContainer = dynamic(() => import('./MapDisplay'), {
    ssr: false,
});

export default BaseMapContainer;
