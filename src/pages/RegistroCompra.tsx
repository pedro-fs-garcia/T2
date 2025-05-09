import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Produto from '../models/produto';
import Servico from '../models/servico';

interface State {
    tipo: 'produto' | 'servico';
    nome: string;
    preco: string;
    quantidade: string;
    quantidadeEstoque: string;
    mensagem: string;
}

type Props = Record<string, never>;

export default class RegistroCompra extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tipo: 'produto',
            nome: '',
            preco: '',
            quantidade: '',
            quantidadeEstoque: '',
            mensagem: ''
        };
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (this.state.tipo === 'produto') {
                const produto = new Produto(
                    this.state.nome,
                    parseFloat(this.state.preco),
                    parseInt(this.state.quantidadeEstoque)
                );
                produto.registrarCompra(parseInt(this.state.quantidade));
                this.setState({ mensagem: 'Compra de produto registrada com sucesso!' });
            } else {
                const servico = new Servico(
                    this.state.nome,
                    parseFloat(this.state.preco)
                );
                servico.registrarCompra(parseInt(this.state.quantidade));
                this.setState({ mensagem: 'Compra de serviço registrada com sucesso!' });
            }
        } catch (error) {
            this.setState({
                mensagem: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            });
        }
    };

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="mb-0">Registro de Compra</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="tipo" className="form-label">Tipo</label>
                                        <select
                                            id="tipo"
                                            className="form-select"
                                            value={this.state.tipo}
                                            onChange={(e) => this.setState({ tipo: e.target.value as 'produto' | 'servico' })}
                                            required
                                        >
                                            <option value="produto">Produto</option>
                                            <option value="servico">Serviço</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="form-control"
                                            value={this.state.nome}
                                            onChange={(e) => this.setState({ nome: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="preco" className="form-label">Preço</label>
                                        <div className="input-group">
                                            <span className="input-group-text">R$</span>
                                            <input
                                                type="number"
                                                id="preco"
                                                className="form-control"
                                                value={this.state.preco}
                                                onChange={(e) => this.setState({ preco: e.target.value })}
                                                step="0.01"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="quantidade" className="form-label">Quantidade</label>
                                        <input
                                            type="number"
                                            id="quantidade"
                                            className="form-control"
                                            value={this.state.quantidade}
                                            onChange={(e) => this.setState({ quantidade: e.target.value })}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    {this.state.tipo === 'produto' && (
                                        <div className="mb-3">
                                            <label htmlFor="estoque" className="form-label">Quantidade em Estoque</label>
                                            <input
                                                type="number"
                                                id="estoque"
                                                className="form-control"
                                                value={this.state.quantidadeEstoque}
                                                onChange={(e) => this.setState({ quantidadeEstoque: e.target.value })}
                                                min="0"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between">
                                        <Link to="/" className="btn btn-secondary">Voltar</Link>
                                        <button type="submit" className="btn btn-primary">Registrar Compra</button>
                                    </div>
                                </form>

                                {this.state.mensagem && (
                                    <div className={`mt-3 alert ${this.state.mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                                        {this.state.mensagem}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 