import { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component{
    render(){
        return (
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
                <div className="text-center col-md-8">
                    <h1 className="display-4 text-primary mb-4">Bem-vindo ao C4P PetShop</h1>
                    <p className="lead text-muted mb-4">
                        Um sistema moderno e eficiente para gerenciamento de petshop. Gerencie clientes,
                        pets, produtos e serviços de forma simples e intuitiva.
                    </p>
    
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/login" className="btn btn-primary btn-lg">
                            Entrar
                        </Link>
                        <Link to="/login" className="btn btn-outline-secondary btn-lg">
                            Criar Conta
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}