import { Component } from "react";
import { Link } from "react-router-dom";

export default class ProdutoList extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Produtos</h2>
                    <Link to="/produtos/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Novo Produto
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Estoque</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ração Premium</td>
                                        <td>Alimentação</td>
                                        <td>R$ 89,90</td>
                                        <td>50</td>
                                        <td>
                                            <div className="btn-group">
                                                <Link to="/produtos/1" className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link to="/produtos/1/editar" className="btn btn-sm btn-outline-secondary">
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