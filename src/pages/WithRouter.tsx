import { ComponentType } from 'react';
import { useParams } from 'react-router-dom';

interface WithRouterProps {
    router: {
        params: {
            id: string;
        };
    };
}

export function withRouter<P extends WithRouterProps>(
    WrappedComponent: ComponentType<P>
) {
    return function WithRouterComponent(props: Omit<P, keyof WithRouterProps>) {
        const params = useParams<{ id: string }>();
        return <WrappedComponent {...props as P} router={{ params }} />;
    };
} 