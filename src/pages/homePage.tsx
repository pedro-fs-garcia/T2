import { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component{
    render(){
        return (
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light px-3">
            <div className="text-center col-12 col-md-8 col-lg-6">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Bem-vindo ao <span className="text-dark">C4P PetShop</span>
              </h1>
              <p className="lead text-secondary mb-4">
                Sistema moderno de gerenciamento de petshops. Controle facilmente seus clientes, pets, agendamentos, produtos e serviços.
              </p>
    
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                <Link to="/login" className="btn btn-primary btn-lg px-4">
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn btn-outline-secondary btn-lg px-4">
                  Criar Conta
                </Link>
              </div>
            </div>
          </div>
        );
    }
}