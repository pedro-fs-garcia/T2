import { Component } from "react";
import { Link } from "react-router-dom";

export default class ServicoForm extends Component {
    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-0">Novo Serviço</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="nome" required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descricao" className="form-label">Descrição</label>
                                        <textarea className="form-control" id="descricao" required></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="preco" className="form-label">Preço</label>
                                        <div className="input-group">
                                            <span className="input-group-text">R$</span>
                                            <input type="number" step="0.01" className="form-control" id="preco" required />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="duracao" className="form-label">Duração (horas)</label>
                                        <input type="number" step="0.5" className="form-control" id="duracao" required />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <Link to="/servicos" className="btn btn-secondary">Voltar</Link>
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