import { Component } from "react";
import { Link } from "react-router-dom";

export default class ServicoList extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Serviços</h2>
                    <Link to="/servicos/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Novo Serviço
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Duração</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Banho e Tosa</td>
                                        <td>Banho completo com tosa higiênica</td>
                                        <td>R$ 80,00</td>
                                        <td>2 horas</td>
                                        <td>
                                            <div className="btn-group">
                                                <Link to="/servicos/1" className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link to="/servicos/1/editar" className="btn btn-sm btn-outline-secondary">
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 