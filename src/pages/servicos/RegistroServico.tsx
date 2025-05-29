import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

interface State {
    servico: Omit<ServicoData, 'id'>;
    mensagem: string;
}

export default class RegistroServico extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            servico: {
                nome: '',
                preco: 0,
                descricao: '',
                duracao: '',
                categoria: ''
            },
            mensagem: ''
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: {
                ...prevState.servico,
                [name]: name === 'preco' ? parseFloat(value) : value
            }
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!this.state.servico.nome.trim()) {
            this.setState({ mensagem: 'O nome do serviço é obrigatório' });
            return;
        }
        if (this.state.servico.preco <= 0) {
            this.setState({ mensagem: 'O preço deve ser maior que zero' });
            return;
        }
        if (!this.state.servico.duracao.trim()) {
            this.setState({ mensagem: 'A duração é obrigatória' });
            return;
        }
        if (!this.state.servico.categoria.trim()) {
            this.setState({ mensagem: 'A categoria é obrigatória' });
            return;
        }

        // Aqui você implementaria a lógica para salvar o serviço
        this.setState({
            mensagem: 'Serviço registrado com sucesso!',
            servico: {
                nome: '',
                preco: 0,
                descricao: '',
                duracao: '',
                categoria: ''
            }
        });
    };

    render() {
        const { servico, mensagem } = this.state;

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Novo Serviço</h2>
                    <Link to="/servicos" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações do Serviço</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={servico.nome}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Preço</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="preco"
                                    value={servico.preco}
                                    onChange={this.handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    className="form-control"
                                    name="descricao"
                                    value={servico.descricao}
                                    onChange={this.handleChange}
                                    rows={3}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Duração</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="duracao"
                                    value={servico.duracao}
                                    onChange={this.handleChange}
                                    placeholder="Ex: 1 hora, 30 minutos"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categoria</label>
                                <select
                                    className="form-select"
                                    name="categoria"
                                    value={servico.categoria}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="banho">Banho e Tosa</option>
                                    <option value="veterinario">Veterinário</option>
                                    <option value="hospedagem">Hospedagem</option>
                                    <option value="adestramento">Adestramento</option>
                                    <option value="spa">Spa</option>
                                </select>
                            </div>

                            {mensagem && (
                                <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                                    {mensagem}
                                </div>
                            )}

                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-check-lg me-2"></i>
                                    Registrar Serviço
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 