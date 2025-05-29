import { Component } from 'react';
import { Link } from 'react-router-dom';

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

interface ProdutoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    categoria: string;
    fornecedor: string;
}

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

interface ItemVenda {
    id: number;
    tipo: 'produto' | 'servico';
    nome: string;
    preco: number;
    quantidade: number;
    subtotal: number;
}

interface VendaData {
    clienteId: number;
    itens: ItemVenda[];
    total: number;
    formaPagamento: string;
}

interface State {
    clientes: ClienteData[];
    produtos: ProdutoData[];
    servicos: ServicoData[];
    clienteSelecionado: number;
    itens: ItemVenda[];
    tipoItem: 'produto' | 'servico';
    itemSelecionado: number;
    quantidade: number;
    formaPagamento: string;
    mensagem: string;
    loading: boolean;
}

export default class RegistroVenda extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            clientes: [],
            produtos: [],
            servicos: [],
            clienteSelecionado: 0,
            itens: [],
            tipoItem: 'produto',
            itemSelecionado: 0,
            quantidade: 1,
            formaPagamento: '',
            mensagem: '',
            loading: true
        };
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = async () => {
        try {
            const [clientesRes, produtosRes, servicosRes] = await Promise.all([
                fetch('/clientes.json'),
                fetch('/produtos.json'),
                fetch('/servicos.json')
            ]);

            const [clientesData, produtosData, servicosData] = await Promise.all([
                clientesRes.json(),
                produtosRes.json(),
                servicosRes.json()
            ]);

            this.setState({
                clientes: clientesData,
                produtos: produtosData,
                servicos: servicosData
            });
        } catch (err) {
            this.setState({ mensagem: `Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        } finally {
            this.setState({ loading: false });
        }
    };

    adicionarItem = () => {
        const { itemSelecionado, quantidade, tipoItem, produtos, servicos } = this.state;

        if (!itemSelecionado || quantidade <= 0) {
            this.setState({ mensagem: 'Selecione um item e informe a quantidade' });
            return;
        }

        const item = tipoItem === 'produto'
            ? produtos.find(p => p.id === itemSelecionado)
            : servicos.find(s => s.id === itemSelecionado);

        if (!item) return;

        const novoItem: ItemVenda = {
            id: Date.now(),
            tipo: tipoItem,
            nome: item.nome,
            preco: item.preco,
            quantidade: quantidade,
            subtotal: item.preco * quantidade
        };

        this.setState(prevState => ({
            itens: [...prevState.itens, novoItem],
            itemSelecionado: 0,
            quantidade: 1
        }));
    };

    removerItem = (id: number) => {
        this.setState(prevState => ({
            itens: prevState.itens.filter(item => item.id !== id)
        }));
    };

    calcularTotal = () => {
        return this.state.itens.reduce((total, item) => total + item.subtotal, 0);
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { clienteSelecionado, itens, formaPagamento } = this.state;

        if (!clienteSelecionado) {
            this.setState({ mensagem: 'Selecione um cliente' });
            return;
        }

        if (itens.length === 0) {
            this.setState({ mensagem: 'Adicione pelo menos um item à venda' });
            return;
        }

        if (!formaPagamento) {
            this.setState({ mensagem: 'Selecione a forma de pagamento' });
            return;
        }

        const venda: VendaData = {
            clienteId: clienteSelecionado,
            itens: itens,
            total: this.calcularTotal(),
            formaPagamento: formaPagamento
        };

        // Aqui você implementaria a lógica para salvar a venda
        this.setState({
            mensagem: 'Venda registrada com sucesso!',
            clienteSelecionado: 0,
            itens: [],
            formaPagamento: ''
        });
    };

    render() {
        const {
            loading,
            mensagem,
            clientes,
            produtos,
            servicos,
            clienteSelecionado,
            itens,
            tipoItem,
            itemSelecionado,
            quantidade,
            formaPagamento
        } = this.state;

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
                    <h2>Registrar Nova Venda</h2>
                    <Link to="/vendas" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                </div>

                {mensagem && (
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                )}

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações da Venda</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Cliente</label>
                                <select
                                    className="form-select"
                                    value={clienteSelecionado}
                                    onChange={(e) => this.setState({ clienteSelecionado: Number(e.target.value) })}
                                    required
                                >
                                    <option value="">Selecione o cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header">
                                    <h6 className="mb-0">Adicionar Item</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-3">
                                            <label className="form-label">Tipo</label>
                                            <select
                                                className="form-select"
                                                value={tipoItem}
                                                onChange={(e) => this.setState({ tipoItem: e.target.value as 'produto' | 'servico' })}
                                            >
                                                <option value="produto">Produto</option>
                                                <option value="servico">Serviço</option>
                                            </select>
                                        </div>

                                        <div className="col-md-5">
                                            <label className="form-label">Item</label>
                                            <select
                                                className="form-select"
                                                value={itemSelecionado}
                                                onChange={(e) => this.setState({ itemSelecionado: Number(e.target.value) })}
                                            >
                                                <option value="">Selecione o item</option>
                                                {tipoItem === 'produto'
                                                    ? produtos.map(produto => (
                                                        <option key={produto.id} value={produto.id}>
                                                            {produto.nome} - R$ {produto.preco.toFixed(2)}
                                                        </option>
                                                    ))
                                                    : servicos.map(servico => (
                                                        <option key={servico.id} value={servico.id}>
                                                            {servico.nome} - R$ {servico.preco.toFixed(2)}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-2">
                                            <label className="form-label">Quantidade</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={quantidade}
                                                onChange={(e) => this.setState({ quantidade: Number(e.target.value) })}
                                                min="1"
                                            />
                                        </div>

                                        <div className="col-md-2 d-flex align-items-end">
                                            <button
                                                type="button"
                                                className="btn btn-success w-100"
                                                onClick={this.adicionarItem}
                                            >
                                                <i className="bi bi-plus-circle me-2"></i>
                                                Adicionar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {itens.length > 0 && (
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <h6 className="mb-0">Itens da Venda</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>Quantidade</th>
                                                        <th>Preço Unit.</th>
                                                        <th>Subtotal</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {itens.map(item => (
                                                        <tr key={item.id}>
                                                            <td>{item.nome}</td>
                                                            <td>{item.quantidade}</td>
                                                            <td>R$ {item.preco.toFixed(2)}</td>
                                                            <td>R$ {item.subtotal.toFixed(2)}</td>
                                                            <td>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => this.removerItem(item.id)}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                                                        <td><strong>R$ {this.calcularTotal().toFixed(2)}</strong></td>
                                                        <td></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Forma de Pagamento</label>
                                <select
                                    className="form-select"
                                    value={formaPagamento}
                                    onChange={(e) => this.setState({ formaPagamento: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione a forma de pagamento</option>
                                    <option value="cartao">Cartão</option>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="pix">PIX</option>
                                </select>
                            </div>

                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-check-lg me-2"></i>
                                    Registrar Venda
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 