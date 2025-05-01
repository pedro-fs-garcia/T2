import { Component } from "react";
import { Link } from "react-router-dom";

export default class PetList extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Pets</h2>
                    <Link to="/pets/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Novo Pet
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Espécie</th>
                                        <th>Raça</th>
                                        <th>Dono</th>
                                        <th>Idade</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Rex</td>
                                        <td>Cachorro</td>
                                        <td>Labrador</td>
                                        <td>João Silva</td>
                                        <td>3 anos</td>
                                        <td>
                                            <div className="btn-group">
                                                <Link to="/pets/1" className="btn btn-sm btn-outline-primary">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link to="/pets/1/editar" className="btn btn-sm btn-outline-secondary">
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