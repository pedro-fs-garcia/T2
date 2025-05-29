import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../WithRouter';

interface ClienteData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cpf: string;
    dataCadastro: string;
    observacoes: string;
}

interface Props {
    editar: string;
    router: {
        params: {
            id: string;
        };
    };
}

interface State {
    cliente: ClienteData | null;
    loading: boolean;
    mensagem: string;
    editando: boolean;
}

class ClienteDetalhes extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cliente: null,
            loading: true,
            mensagem: '',
            editando: false
        };
    }

    componentDidMount() {
        const { id } = this.props.router.params;
        fetch('/clientes.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os dados do cliente');
                return res.json();
            })
            .then((data: ClienteData[]) => {
                const clienteEncontrado = data.find(c => c.id === Number(id));
                if (clienteEncontrado) {
                    this.setState({ cliente: clienteEncontrado });
                } else {
                    this.setState({ mensagem: 'Cliente não encontrado' });
                }
            })
            .catch((err) => this.setState({ mensagem: `Erro: ${err.message}` }))
            .finally(() => this.setState({ loading: false }));
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            ...prevState,
            cliente: prevState.cliente ? {
                ...prevState.cliente,
                [name]: value
            } : null
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para salvar as alterações
        this.setState({ 
            mensagem: 'Alterações salvas com sucesso!',
            editando: false
        });
    };

    toggleEditando = () => {
        this.setState(prevState => ({ editando: !prevState.editando }));
    };

    renderField = (
        label: string,
        name: keyof ClienteData,
        type: 'text' | 'email' | 'tel' | 'textarea' = 'text'
    ) => {
        const { cliente, editando } = this.state;
        return (
            <div className="mb-3">
                <label className="form-label">{label}</label>
                {editando ? (
                    type === 'textarea' ? (
                        <textarea
                            className="form-control"
                            name={name}
                            value={cliente?.[name] || ''}
                            onChange={this.handleChange}
                            rows={3}
                        />
                    ) : (
                        <input
                            type={type}
                            className="form-control"
                            name={name}
                            value={cliente?.[name] || ''}
                            onChange={this.handleChange}
                        />
                    )
                ) : (
                    <p className="form-control-plaintext">{cliente?.[name] || ''}</p>
                )}
            </div>
        );
    };

    render() {
        const { loading, mensagem, cliente, editando } = this.state;

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
                    <Link to="/clientes" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Clientes
                    </Link>
                </div>
            );
        }

        if (!cliente) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Cliente não encontrado
                    </div>
                    <Link to="/clientes" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Clientes
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes do Cliente</h2>
                    <div>
                        <Link to="/clientes" className="btn btn-outline-secondary me-2">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleEditando}
                        >
                            <i className={`bi bi-${editando ? 'check' : 'pencil'} me-2`}></i>
                            {editando ? 'Salvar' : 'Editar'}
                        </button>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações do Cliente</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            {this.renderField('Nome', 'nome')}
                            {this.renderField('E-mail', 'email', 'email')}
                            {this.renderField('Telefone', 'telefone', 'tel')}
                            {this.renderField('CPF', 'cpf')}
                            {this.renderField('Endereço', 'endereco')}
                            {this.renderField('Data de Cadastro', 'dataCadastro')}
                            {this.renderField('Observações', 'observacoes', 'textarea')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ClienteDetalhes); 
