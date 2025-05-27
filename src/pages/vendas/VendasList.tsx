import { Component } from "react";
import { Link } from "react-router-dom";

export default class VendasList extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Vendas de produtos e serviços</h2>
                    <Link to="/vendas/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Nova venda
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                        <th>Preço un.</th>
                                        <th>Desconto</th>
                                        <th>Cliente</th>
                                        <th>Pet</th>
                                        <th>Preço total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Serviço</td>
                                        <td>Banho e Tosa</td>
                                        <td>1</td>
                                        <td>R$ 80,00</td>
                                        <td>Null</td>
                                        <td>João da Silva</td>
                                        <td>Rex</td>
                                        <td>R$ 80,00</td>
                                        <td>
                                            <div className="btn-group">
                                                <Link to="/vendas/1" className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link to="/vendas/1/editar" className="btn btn-sm btn-outline-secondary">
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