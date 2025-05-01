import { Component } from "react";
import { Link } from "react-router-dom";

export default class PetForm extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-0">Novo Pet</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="nome" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="especie" className="form-label">Espécie</label>
                                        <select className="form-select" id="especie" required>
                                            <option value="">Selecione...</option>
                                            <option value="cachorro">Cachorro</option>
                                            <option value="gato">Gato</option>
                                            <option value="outro">Outro</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="raca" className="form-label">Raça</label>
                                        <input type="text" className="form-control" id="raca" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="dono" className="form-label">Dono</label>
                                        <select className="form-select" id="dono" required>
                                            <option value="">Selecione...</option>
                                            <option value="1">João Silva</option>
                                            <option value="2">Maria Santos</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="idade" className="form-label">Idade</label>
                                        <input type="number" className="form-control" id="idade" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="peso" className="form-label">Peso (kg)</label>
                                        <input type="number" step="0.1" className="form-control" id="peso" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="observacoes" className="form-label">Observações</label>
                                        <textarea className="form-control" id="observacoes"></textarea>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <Link to="/pets" className="btn btn-secondary">Voltar</Link>
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