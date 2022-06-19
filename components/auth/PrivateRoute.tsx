import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

const PrivateRoute = (props: any) => {
    const [renderContent, setRenderContent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('sflix-auth-token');
        if (token && token === 'averygoodadmin') {
            setRenderContent(true);
        } else {
            router.push('/auth/login');
        }
    }, [router]);
    return renderContent ? <Fragment>{props.children}</Fragment> : <></>;
};

export default PrivateRoute;
