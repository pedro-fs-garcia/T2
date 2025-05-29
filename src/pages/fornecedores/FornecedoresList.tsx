import { Component } from 'react';
import { Link } from 'react-router-dom';

interface FornecedorData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cnpj: string;
    observacoes: string;
}

interface State {
    fornecedores: FornecedorData[];
    busca: string;
    mensagem: string;
    loading: boolean;
}

export default class FornecedoresList extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            fornecedores: [],
            busca: '',
            mensagem: '',
            loading: true
        };
    }

    componentDidMount() {
        this.carregarFornecedores();
    }

    carregarFornecedores = async () => {
        try {
            const response = await fetch('/fornecedores.json');
            const data = await response.json();
            this.setState({ fornecedores: data });
        } catch (err) {
            this.setState({ mensagem: `Erro ao carregar fornecedores: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleExcluir = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
            try {
                // Aqui você implementaria a chamada à API para excluir o fornecedor
                this.setState(prevState => ({
                    fornecedores: prevState.fornecedores.filter(f => f.id !== id),
                    mensagem: 'Fornecedor excluído com sucesso!'
                }));
            } catch (err) {
                this.setState({ mensagem: `Erro ao excluir fornecedor: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
            }
        }
    };

    handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ busca: e.target.value });
    };

    render() {
        const { fornecedores, busca, mensagem, loading } = this.state;

        const fornecedoresFiltrados = fornecedores.filter(fornecedor =>
            fornecedor.nome.toLowerCase().includes(busca.toLowerCase()) ||
            fornecedor.email.toLowerCase().includes(busca.toLowerCase()) ||
            fornecedor.cnpj.includes(busca)
        );

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

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Fornecedores</h2>
                    <Link to="/fornecedores/novo" className="btn btn-success">
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Fornecedor
                    </Link>
                </div>

                {mensagem && (
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                )}

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Lista de Fornecedores</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar por nome, email ou CNPJ..."
                                value={busca}
                                onChange={this.handleBuscaChange}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>CNPJ</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fornecedoresFiltrados.map(fornecedor => (
                                        <tr key={fornecedor.id}>
                                            <td>{fornecedor.nome}</td>
                                            <td>{fornecedor.email}</td>
                                            <td>{fornecedor.telefone}</td>
                                            <td>{fornecedor.cnpj}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link
                                                        to={`/fornecedores/${fornecedor.id}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>
                                                    <Link
                                                        to={`/fornecedores/${fornecedor.id}`}
                                                        className="btn btn-sm btn-outline-secondary"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => this.handleExcluir(fornecedor.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 