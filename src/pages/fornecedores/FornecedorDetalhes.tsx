import { Component } from 'react';
import { Link, useParams } from 'react-router-dom';

interface FornecedorData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cnpj: string;
    observacoes: string;
}

interface Props {
    id: string;
}

interface State {
    fornecedor: FornecedorData | null;
    editando: boolean;
    mensagem: string;
    loading: boolean;
}

class FornecedorDetalhesClass extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fornecedor: null,
            editando: false,
            mensagem: '',
            loading: true
        };
    }

    componentDidMount() {
        this.carregarFornecedor();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.id !== this.props.id) {
            this.carregarFornecedor();
        }
    }

    carregarFornecedor = async () => {
        try {
            const response = await fetch('/fornecedores.json');
            const fornecedores = await response.json();
            const fornecedorEncontrado = fornecedores.find((f: FornecedorData) => f.id === Number(this.props.id));
            
            if (fornecedorEncontrado) {
                this.setState({ fornecedor: fornecedorEncontrado });
            } else {
                this.setState({ mensagem: 'Fornecedor não encontrado' });
            }
        } catch (err) {
            this.setState({ mensagem: `Erro ao carregar fornecedor: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            fornecedor: prevState.fornecedor ? { ...prevState.fornecedor, [name]: value } : null
        }));
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { fornecedor } = this.state;
        if (!fornecedor) return;

        try {
            // Aqui você implementaria a chamada à API para salvar as alterações
            this.setState({
                mensagem: 'Fornecedor atualizado com sucesso!',
                editando: false
            });
        } catch (err) {
            this.setState({ mensagem: `Erro ao atualizar fornecedor: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        }
    };

    render() {
        const { fornecedor, editando, mensagem, loading } = this.state;

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

        if (!fornecedor) {
            return (
                <div className="container py-4">
                    <div className="alert alert-danger" role="alert">
                        {mensagem}
                    </div>
                    <Link to="/fornecedores" className="btn btn-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>{editando ? 'Editar Fornecedor' : 'Detalhes do Fornecedor'}</h2>
                    <div>
                        {!editando && (
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => this.setState({ editando: true })}
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Editar
                            </button>
                        )}
                        <Link to="/fornecedores" className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                    </div>
                </div>

                {mensagem && (
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                )}

                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações do Fornecedor</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Nome</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={fornecedor.nome}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.nome}</p>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">CNPJ</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cnpj"
                                            value={fornecedor.cnpj}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.cnpj}</p>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    {editando ? (
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={fornecedor.email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.email}</p>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Telefone</label>
                                    {editando ? (
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="telefone"
                                            value={fornecedor.telefone}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.telefone}</p>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Endereço</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="endereco"
                                            value={fornecedor.endereco}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.endereco}</p>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Observações</label>
                                    {editando ? (
                                        <textarea
                                            className="form-control"
                                            name="observacoes"
                                            value={fornecedor.observacoes}
                                            onChange={this.handleChange}
                                            rows={3}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{fornecedor.observacoes}</p>
                                    )}
                                </div>
                            </div>

                            {editando && (
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-success me-2">
                                        <i className="bi bi-save me-2"></i>
                                        Salvar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            this.setState({ editando: false });
                                            this.carregarFornecedor();
                                        }}
                                    >
                                        Cancelar
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

export default function FornecedorDetalhes() {
    const { id } = useParams<{ id: string }>();
    return <FornecedorDetalhesClass id={id || ''} />;
} 