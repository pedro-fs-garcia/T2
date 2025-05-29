import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Servico {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

interface State {
    servico: Servico | null;
    loading: boolean;
    mensagem: string;
    editando: boolean;
}

export default class ServicoDetalhes extends Component<{ id: string }, State> {
    constructor(props: { id: string }) {
        super(props);
        this.state = {
            servico: {
                id: 1,
                nome: "Banho e Tosa",
                preco: 120.00,
                descricao: "Serviço completo de banho e tosa para cães e gatos, incluindo corte de unhas e limpeza de ouvidos.",
                duracao: "2 horas",
                categoria: "Higiene"
            },
            loading: false,
            mensagem: '',
            editando: false
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: prevState.servico ? { ...prevState.servico, [name]: value } : null
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { servico } = this.state;

        if (!servico) return;

        this.setState({
            mensagem: 'Serviço atualizado com sucesso!',
            editando: false
        });
    };

    render() {
        const { servico, loading, mensagem, editando } = this.state;

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
                    <Link to="/servicos" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Serviços
                    </Link>
                </div>
            );
        }

        if (!servico) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Serviço não encontrado
                    </div>
                    <Link to="/servicos" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Serviços
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes do Serviço #{servico.id}</h2>
                    <div>
                        <Link to="/servicos" className="btn btn-outline-secondary me-2">
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
                        <h5 className="mb-0">Informações do Serviço</h5>
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
                                            value={servico.nome}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{servico.nome}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Preço</label>
                                    {editando ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="preco"
                                            value={servico.preco}
                                            onChange={this.handleChange}
                                            step="0.01"
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">R$ {servico.preco.toFixed(2)}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Duração</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="duracao"
                                            value={servico.duracao}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{servico.duracao}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Categoria</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="categoria"
                                            value={servico.categoria}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{servico.categoria}</p>
                                    )}
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">Descrição</label>
                                    {editando ? (
                                        <textarea
                                            className="form-control"
                                            name="descricao"
                                            value={servico.descricao}
                                            onChange={this.handleChange}
                                            rows={3}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{servico.descricao}</p>
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