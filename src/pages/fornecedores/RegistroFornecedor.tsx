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
    fornecedor: Omit<FornecedorData, 'id'>;
    mensagem: string;
}

export default class RegistroFornecedor extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            fornecedor: {
                nome: '',
                email: '',
                telefone: '',
                endereco: '',
                cnpj: '',
                observacoes: ''
            },
            mensagem: ''
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            fornecedor: { ...prevState.fornecedor, [name]: value }
        }));
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Aqui você implementaria a chamada à API para salvar o novo fornecedor
            this.setState({
                mensagem: 'Fornecedor registrado com sucesso!',
                fornecedor: {
                    nome: '',
                    email: '',
                    telefone: '',
                    endereco: '',
                    cnpj: '',
                    observacoes: ''
                }
            });
        } catch (err) {
            this.setState({ mensagem: `Erro ao registrar fornecedor: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        }
    };

    render() {
        const { fornecedor, mensagem } = this.state;

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Novo Fornecedor</h2>
                    <Link to="/fornecedores" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        value={fornecedor.nome}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">CNPJ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cnpj"
                                        value={fornecedor.cnpj}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={fornecedor.email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Telefone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="telefone"
                                        value={fornecedor.telefone}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Endereço</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="endereco"
                                        value={fornecedor.endereco}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Observações</label>
                                    <textarea
                                        className="form-control"
                                        name="observacoes"
                                        value={fornecedor.observacoes}
                                        onChange={this.handleChange}
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-save me-2"></i>
                                    Registrar Fornecedor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 