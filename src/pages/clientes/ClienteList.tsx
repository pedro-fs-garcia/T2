import { Component } from "react";
import { Link } from "react-router-dom";

export default class ClienteList extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Clientes</h2>
                    <Link to="/clientes/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Novo Cliente
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>João Silva</td>
                                        <td>123.456.789-00</td>
                                        <td>(11) 99999-9999</td>
                                        <td>joao@email.com</td>
                                        <td>
                                            <div className="btn-group">
                                                <Link to="/clientes/1" className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link to="/clientes/1/editar" className="btn btn-sm btn-outline-secondary">
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