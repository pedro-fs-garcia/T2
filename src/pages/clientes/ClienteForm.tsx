import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ClienteData {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: string;
    observacoes: string;
}

interface State {
    cliente: ClienteData;
    mensagem: string;
}

export default class ClienteForm extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            cliente: {
                nome: '',
                email: '',
                telefone: '',
                endereco: '',
                cpf: '',
                observacoes: ''
            },
            mensagem: ''
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            cliente: {
                ...prevState.cliente,
                [name]: value
            }
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { cliente } = this.state;
        
        // Validações básicas
        if (!cliente.nome.trim()) {
            this.setState({ mensagem: 'O nome do cliente é obrigatório' });
            return;
        }
        if (!cliente.email.trim()) {
            this.setState({ mensagem: 'O e-mail do cliente é obrigatório' });
            return;
        }
        if (!cliente.telefone.trim()) {
            this.setState({ mensagem: 'O telefone do cliente é obrigatório' });
            return;
        }
        if (!cliente.cpf.trim()) {
            this.setState({ mensagem: 'O CPF do cliente é obrigatório' });
            return;
        }

        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cliente.email)) {
            this.setState({ mensagem: 'E-mail inválido' });
            return;
        }

        // Validação de CPF (formato básico)
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cliente.cpf)) {
            this.setState({ mensagem: 'CPF inválido. Use o formato: 000.000.000-00' });
            return;
        }

        // Validação de telefone (formato básico)
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(cliente.telefone)) {
            this.setState({ mensagem: 'Telefone inválido. Use o formato: (00) 00000-0000' });
            return;
        }

        // Aqui você implementaria a lógica para salvar o cliente
        this.setState({
            mensagem: 'Cliente registrado com sucesso!',
            cliente: {
                nome: '',
                email: '',
                telefone: '',
                endereco: '',
                cpf: '',
                observacoes: ''
            }
        });
    };

    render() {
        const { cliente, mensagem } = this.state;

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Registrar Novo Cliente</h2>
                    <Link to="/clientes" className="btn btn-outline-secondary">
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
                        <h5 className="mb-0">Informações do Cliente</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={cliente.nome}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">E-mail</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={cliente.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Telefone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="telefone"
                                    value={cliente.telefone}
                                    onChange={this.handleChange}
                                    placeholder="(00) 00000-0000"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cpf"
                                    value={cliente.cpf}
                                    onChange={this.handleChange}
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Endereço</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="endereco"
                                    value={cliente.endereco}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Observações</label>
                                <textarea
                                    className="form-control"
                                    name="observacoes"
                                    value={cliente.observacoes}
                                    onChange={this.handleChange}
                                    rows={3}
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-save me-2"></i>
                                    Registrar Cliente
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 