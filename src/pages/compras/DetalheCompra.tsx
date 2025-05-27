import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Produto from '../../models/produto';
import Servico from '../../models/servico';

interface Props {
    editar: string; // "true" ou "false" (como string do Route)
}

interface State {
    tipo: 'produto' | 'servico';
    nome: string;
    preco: number;
    quantidade: number;
    quantidadeEstoque: number;
    mensagem: string;
    editar: boolean;
}

export default class DetalheCompra extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            tipo: 'servico',
            nome: 'Banho e Tosa',
            preco: 80.0,
            quantidade: 3,
            quantidadeEstoque: 5,
            mensagem: '',
            editar: props.editar === 'true'
        };
    }

    handleChange = (field: keyof State, value: any) => {
        this.setState({ [field]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { tipo, nome, preco, quantidade, quantidadeEstoque } = this.state;
            if (tipo === 'produto') {
                const produto = new Produto(null, nome, preco, quantidadeEstoque);
                produto.registrarCompra(quantidade);
                this.setState({ mensagem: 'Compra de produto registrada com sucesso!' });
            } else {
                const servico = new Servico(null, nome, preco);
                servico.registrarCompra(quantidade);
                this.setState({ mensagem: 'Compra de serviço registrada com sucesso!' });
            }
        } catch (error) {
            this.setState({
                mensagem: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            });
        }
    };

    renderField = (
        label: string,
        value: string | number,
        field: keyof State,
        type: 'text' | 'number' = 'text'
    ) => {
        return (
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label fw-bold">{label}</label>
                <div className="col-sm-8">
                    {this.state.editar ? (
                        <input
                            type={type}
                            className="form-control"
                            value={value}
                            onChange={(e) => this.handleChange(field, type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                        />
                    ) : (
                        <p className="form-control-plaintext">
                            {field === 'preco' || field === 'quantidadeEstoque' || field === 'quantidade'
                                ? `R$ ${(value as number).toFixed(2)}`
                                : value}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { tipo, nome, preco, quantidade, quantidadeEstoque, mensagem, editar } = this.state;

        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-dark text-white">
                                <h4 className="mb-0">
                                    {editar ? 'Editar Compra' : 'Detalhes da Compra'}
                                </h4>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="card-body">
                                    {/* Tipo */}
                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Tipo</label>
                                        <div className="col-sm-8">
                                            {editar ? (
                                                <select
                                                    className="form-select"
                                                    value={tipo}
                                                    onChange={(e) => this.handleChange('tipo', e.target.value as 'produto' | 'servico')}
                                                >
                                                    <option value="produto">Produto</option>
                                                    <option value="servico">Serviço</option>
                                                </select>
                                            ) : (
                                                <p className="form-control-plaintext">{tipo === 'produto' ? 'Produto' : 'Serviço'}</p>
                                            )}
                                        </div>
                                    </div>

                                    {this.renderField('Nome', nome, 'nome')}
                                    {this.renderField('Preço Unitário', preco, 'preco', 'number')}
                                    {this.renderField('Quantidade', quantidade, 'quantidade', 'number')}

                                    {tipo === 'produto' &&
                                        this.renderField('Estoque Após Compra', quantidadeEstoque, 'quantidadeEstoque', 'number')}

                                    <div className="mb-3 row">
                                        <label className="col-sm-4 col-form-label fw-bold">Total</label>
                                        <div className="col-sm-8">
                                            <p className="form-control-plaintext">
                                                R$ {(preco * quantidade).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    {mensagem && (
                                        <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                                            {mensagem}
                                        </div>
                                    )}

                                    <div className="mt-4 d-flex justify-content-between">
                                        <Link to="/compras" className="btn btn-outline-secondary">Voltar</Link>
                                        {editar && (
                                            <button type="submit" className="btn btn-primary">
                                                Salvar Alterações
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
