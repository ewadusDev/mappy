'use client';

import dynamic from 'next/dynamic';


// Dynamically import the MapLandmark component with SSR disabled
const BaseMapContent = dynamic(() => import('./MapContent'), {
    ssr: false,
});

export default BaseMapContent;
