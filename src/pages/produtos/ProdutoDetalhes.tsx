import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    fornecedor: string;
}

interface State {
    produto: Produto | null;
    loading: boolean;
    mensagem: string;
    editando: boolean;
}

export default class ProdutoDetalhes extends Component<{ id: string }, State> {
    constructor(props: { id: string }) {
        super(props);
        this.state = {
            produto: {
                id: 1,
                nome: "Ração Premium para Cães",
                preco: 89.90,
                descricao: "Ração premium para cães adultos, rica em proteínas e nutrientes essenciais.",
                quantidade: 50,
                categoria: "Alimentação",
                fornecedor: "PetShop Distribuidora"
            },
            loading: false,
            mensagem: '',
            editando: false
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            produto: prevState.produto ? { ...prevState.produto, [name]: value } : null
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { produto } = this.state;

        if (!produto) return;

        this.setState({
            mensagem: 'Produto atualizado com sucesso!',
            editando: false
        });
    };

    render() {
        const { produto, loading, mensagem, editando } = this.state;

        if (loading) {
            return (
                <div className="container py-4">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (mensagem) {
            return (
                <div className="container py-4">
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                    <Link to="/produtos" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Produtos
                    </Link>
                </div>
            );
        }

        if (!produto) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Produto não encontrado
                    </div>
                    <Link to="/produtos" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Produtos
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes do Produto #{produto.id}</h2>
                    <div>
                        <Link to="/produtos" className="btn btn-outline-secondary me-2">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.setState({ editando: !editando })}
                        >
                            <i className="bi bi-pencil me-2"></i>
                            {editando ? 'Cancelar Edição' : 'Editar'}
                        </button>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Informações do Produto</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={produto.nome}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{produto.nome}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Preço</label>
                                    {editando ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="preco"
                                            value={produto.preco}
                                            onChange={this.handleChange}
                                            step="0.01"
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">R$ {produto.preco.toFixed(2)}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Quantidade</label>
                                    {editando ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="quantidade"
                                            value={produto.quantidade}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{produto.quantidade}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Categoria</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="categoria"
                                            value={produto.categoria}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{produto.categoria}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Fornecedor</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fornecedor"
                                            value={produto.fornecedor}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{produto.fornecedor}</p>
                                    )}
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">Descrição</label>
                                    {editando ? (
                                        <textarea
                                            className="form-control"
                                            name="descricao"
                                            value={produto.descricao}
                                            onChange={this.handleChange}
                                            rows={3}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{produto.descricao}</p>
                                    )}
                                </div>
                            </div>

                            {editando && (
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-lg me-2"></i>
                                        Salvar Alterações
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}