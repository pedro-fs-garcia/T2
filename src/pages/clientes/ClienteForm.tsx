import { Component } from "react";
import { Link } from "react-router-dom";

export default class ClienteForm extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-0">Novo Cliente</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="nome" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="cpf" className="form-label">CPF</label>
                                        <input type="text" className="form-control" id="cpf" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="telefone" className="form-label">Telefone</label>
                                        <input type="tel" className="form-control" id="telefone" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="endereco" className="form-label">Endereço</label>
                                        <input type="text" className="form-control" id="endereco" required />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <Link to="/clientes" className="btn btn-secondary">Voltar</Link>
                                        <button type="submit" className="btn btn-primary">Salvar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 