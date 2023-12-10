import { Navigate } from "react-router-dom"

type PrivateRouterProps = {
    children: JSX.Element
}

const PrivateRouter = (props: PrivateRouterProps) => {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');

    if (!user) {
        // chua dang nhap -> trang login
        return <Navigate to={`/login`} />;
    }

    const { role } = user;

    if (role === 'admin' || role === 'staff') {
        return props.children;
    }
    return (
        <h1>403 Forbidden <a href="/">Go home</a></h1>
    )
}

export default PrivateRouter;