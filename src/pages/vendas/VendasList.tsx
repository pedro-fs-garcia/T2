import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Venda {
    id: number;
    data: string;
    cliente: {
        nome: string;
    };
    total: number;
    status: string;
    formaPagamento: string;
}

interface State {
    vendas: Venda[];
    loading: boolean;
    mensagem: string;
}

export default class VendaList extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            vendas: [],
            loading: true,
            mensagem: ''
        };
    }

    componentDidMount() {
        fetch('/vendas.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar as vendas');
                return res.json();
            })
            .then((data: Venda[]) => {
                this.setState({ vendas: data });
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
            pix: 'PIX'
        };
        return formasMap[forma] || forma;
    };

    render() {
        const { loading, mensagem, vendas } = this.state;

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
                    <h2>Lista de Vendas</h2>
                    <Link to="/vendas/novo" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nova Venda
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Forma de Pagamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda) => (
                                <tr key={venda.id}>
                                    <td>#{venda.id}</td>
                                    <td>{this.formatarData(venda.data)}</td>
                                    <td>{venda.cliente.nome}</td>
                                    <td>R$ {venda.total.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge bg-${this.getStatusBadgeColor(venda.status)}`}>
                                            {this.getStatusLabel(venda.status)}
                                        </span>
                                    </td>
                                    <td>{this.getFormaPagamentoLabel(venda.formaPagamento)}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/vendas/${venda.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link
                                                to={`/vendas/${venda.id}/editar`}
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