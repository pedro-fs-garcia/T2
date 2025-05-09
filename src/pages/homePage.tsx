import { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component{
    render(){
        return (
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary mb-3">
                        Bem-vindo ao <span className="text-dark">C4P PetShop</span>
                    </h1>
                    <p className="lead text-secondary mb-4">
                        Sistema moderno de gerenciamento de petshops. Controle facilmente seus clientes, pets, agendamentos, produtos e serviços.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h3 className="card-title">Cadastros</h3>
                                <div className="d-grid gap-2">
                                    <Link to="/clientes" className="btn btn-outline-primary">Clientes</Link>
                                    <Link to="/pets" className="btn btn-outline-primary">Pets</Link>
                                    <Link to="/produtos" className="btn btn-outline-primary">Produtos</Link>
                                    <Link to="/servicos" className="btn btn-outline-primary">Serviços</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h3 className="card-title">Registros</h3>
                                <div className="d-grid gap-2">
                                    <Link to="/registro/compra" className="btn btn-outline-success">Registro de Compra</Link>
                                    <Link to="/registro/venda" className="btn btn-outline-success">Registro de Venda</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h3 className="card-title">Acesso</h3>
                                <div className="d-grid gap-2">
                                    <Link to="/login" className="btn btn-primary">Entrar</Link>
                                    <Link to="/cadastro" className="btn btn-outline-secondary">Criar Conta</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}