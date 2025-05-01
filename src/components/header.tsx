import { Component} from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render(){
        const handleLogout = () => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem('user');
            window.location.href = "/login";
        };
        
        let user = null;
      
        try {
            const storedUser = sessionStorage.getItem("user");
            user = storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Erro ao carregar usuário do sessionStorage:", error);
        }
        
        return (
            <header className="bg-dark text-white py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <Link to="/" className="text-white text-decoration-none">
                        <h1 className="h4 mb-0">C4P PetShop</h1>
                    </Link>
                    <nav>
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-white">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/clientes" className="nav-link text-white">Clientes</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pets" className="nav-link text-white">Pets</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/produtos" className="nav-link text-white">Produtos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/servicos" className="nav-link text-white">Serviços</Link>
                            </li>
                            {user ? (
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="nav-link text-white">Logout</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link text-white">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}