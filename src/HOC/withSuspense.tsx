import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';

export function withSuspense<WPC>(WrappedComponent: React.ComponentType<WPC>) {
    return (props: WPC) => (
        <React.Suspense fallback={<Preloader />}>
            <WrappedComponent {...props} />
        </React.Suspense>
    );
}
