import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface Servico {
    id: number;
    nome: string;
    preco: number;
}

interface ItemVenda {
    id: number;
    tipo: 'produto' | 'servico';
    item: Produto | Servico;
    quantidade: number;
    subtotal: number;
}

interface Venda {
    id: number;
    data: string;
    cliente: Cliente;
    itens: ItemVenda[];
    total: number;
    status: string;
    formaPagamento: string;
}

interface State {
    venda: Venda | null;
    loading: boolean;
    mensagem: string;
    editando: boolean;
}

export default class DetalheVenda extends Component<{ id: string; editar: string }, State> {
    constructor(props: { id: string; editar: string }) {
        super(props);
        this.state = {
            venda: {
                id: 1,
                data: "2024-03-15",
                cliente: {
                    id: 1,
                    nome: "Maria Oliveira",
                    email: "maria.oliveira@email.com",
                    telefone: "(11) 91234-5678"
                },
                itens: [
                    {
                        id: 1,
                        tipo: "produto",
                        item: {
                            id: 1,
                            nome: "Ração Premium",
                            preco: 89.90
                        },
                        quantidade: 2,
                        subtotal: 179.80
                    },
                    {
                        id: 2,
                        tipo: "servico",
                        item: {
                            id: 1,
                            nome: "Banho e Tosa",
                            preco: 120.00
                        },
                        quantidade: 1,
                        subtotal: 120.00
                    }
                ],
                total: 299.80,
                status: "concluida",
                formaPagamento: "cartao"
            },
            loading: false,
            mensagem: '',
            editando: props.editar === 'true'
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            venda: prevState.venda ? { ...prevState.venda, [name]: value } : null
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { venda } = this.state;

        if (!venda) return;

        this.setState({
            mensagem: 'Venda atualizada com sucesso!',
            editando: false
        });
    };

    formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: string } = {
            concluida: 'Concluída',
            pendente: 'Pendente',
            cancelada: 'Cancelada'
        };
        return statusMap[status] || status;
    };

    getFormaPagamentoLabel = (forma: string) => {
        const formasMap: { [key: string]: string } = {
            cartao: 'Cartão',
            dinheiro: 'Dinheiro',
            pix: 'PIX',
            boleto: 'Boleto'
        };
        return formasMap[forma] || forma;
    };

    render() {
        const { venda, loading, mensagem, editando } = this.state;

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
                    <Link to="/vendas" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Vendas
                    </Link>
                </div>
            );
        }

        if (!venda) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Venda não encontrada
                    </div>
                    <Link to="/vendas" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Vendas
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes da Venda #{venda.id}</h2>
                    <div>
                        <Link to="/vendas" className="btn btn-outline-secondary me-2">
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

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Informações Gerais</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Data</label>
                                        <p className="form-control-plaintext">{this.formatarData(venda.data)}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        {editando ? (
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={venda.status}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option value="pendente">Pendente</option>
                                                <option value="concluida">Concluída</option>
                                                <option value="cancelada">Cancelada</option>
                                            </select>
                                        ) : (
                                            <p className="form-control-plaintext">{this.getStatusLabel(venda.status)}</p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Forma de Pagamento</label>
                                        {editando ? (
                                            <select
                                                className="form-select"
                                                name="formaPagamento"
                                                value={venda.formaPagamento}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option value="cartao">Cartão</option>
                                                <option value="dinheiro">Dinheiro</option>
                                                <option value="pix">PIX</option>
                                                <option value="boleto">Boleto</option>
                                            </select>
                                        ) : (
                                            <p className="form-control-plaintext">{this.getFormaPagamentoLabel(venda.formaPagamento)}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Cliente</label>
                                        <p className="form-control-plaintext">{venda.cliente.nome}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <p className="form-control-plaintext">{venda.cliente.email}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Telefone</label>
                                        <p className="form-control-plaintext">{venda.cliente.telefone}</p>
                                    </div>
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

                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Itens da Venda</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Item</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unitário</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venda.itens.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.tipo === 'produto' ? 'Produto' : 'Serviço'}</td>
                                            <td>{item.item.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.item.preco.toFixed(2)}</td>
                                            <td>R$ {item.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4} className="text-end"><strong>Total:</strong></td>
                                        <td><strong>R$ {venda.total.toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
