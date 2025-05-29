import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Fornecedor {
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

interface ItemCompra {
    id: number;
    produto: Produto;
    quantidade: number;
    subtotal: number;
}

interface Compra {
    id: number;
    data: string;
    fornecedor: Fornecedor;
    itens: ItemCompra[];
    total: number;
    status: string;
    formaPagamento: string;
}

interface State {
    compras: Compra[];
    loading: boolean;
    mensagem: string;
}

export default class ComprasList extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            compras: [],
            loading: true,
            mensagem: ''
        };
    }

    componentDidMount() {
        fetch('/compras.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar as compras');
                return res.json();
            })
            .then((data: Compra[]) => {
                this.setState({ compras: data });
            })
            .catch((err) => this.setState({ mensagem: `Erro: ${err.message}` }))
            .finally(() => this.setState({ loading: false }));
    }

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
        const { loading, mensagem, compras } = this.state;

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
                    <div className="alert alert-danger" role="alert">
                        {mensagem}
                    </div>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Lista de Compras</h2>
                    <Link to="/compras/novo" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nova Compra
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Fornecedor</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Forma de Pagamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((compra) => (
                                <tr key={compra.id}>
                                    <td>#{compra.id}</td>
                                    <td>{this.formatarData(compra.data)}</td>
                                    <td>{compra.fornecedor.nome}</td>
                                    <td>R$ {compra.total.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge bg-${this.getStatusBadgeColor(compra.status)}`}>
                                            {this.getStatusLabel(compra.status)}
                                        </span>
                                    </td>
                                    <td>{this.getFormaPagamentoLabel(compra.formaPagamento)}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/compras/${compra.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link
                                                to={`/compras/${compra.id}/editar`}
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private getStatusBadgeColor(status: string): string {
        const colorMap: { [key: string]: string } = {
            concluida: 'success',
            pendente: 'warning',
            cancelada: 'danger'
        };
        return colorMap[status] || 'secondary';
    }
}
