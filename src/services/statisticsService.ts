interface EstatisticasConsumo {
  cliente: {
    id: number;
    nome: string;
  };
  quantidade: number;
  valor: number;
}

interface EstatisticasItem {
  item: {
    id: number;
    nome: string;
    tipo: 'produto' | 'servico';
  };
  quantidade: number;
}

interface EstatisticasPet {
  tipo: string;
  raca: string;
  itens: EstatisticasItem[];
}

export class ServicoEstatisticas {
  private vendasMock = [
    {
      id: 1,
      data: '2024-03-15',
      cliente: { id: 1, nome: 'João Silva' },
      itens: [
        { id: 1, produto: { id: 1, nome: 'Ração Premium', preco: 89.90 }, quantidade: 2, subtotal: 179.80 },
        { id: 2, servico: { id: 1, nome: 'Banho e Tosa', preco: 120.00 }, quantidade: 1, subtotal: 120.00 }
      ],
      total: 299.80,
      status: 'concluida',
      formaPagamento: 'cartao'
    },
    {
      id: 2,
      data: '2024-03-14',
      cliente: { id: 2, nome: 'Maria Santos' },
      itens: [
        { id: 3, produto: { id: 2, nome: 'Brinquedo Interativo', preco: 45.90 }, quantidade: 1, subtotal: 45.90 },
        { id: 4, servico: { id: 2, nome: 'Consulta Veterinária', preco: 150.00 }, quantidade: 1, subtotal: 150.00 }
      ],
      total: 195.90,
      status: 'concluida',
      formaPagamento: 'dinheiro'
    },
    {
      id: 3,
      data: '2024-03-13',
      cliente: { id: 3, nome: 'Pedro Oliveira' },
      itens: [
        { id: 5, produto: { id: 3, nome: 'Cama para Cachorro', preco: 199.90 }, quantidade: 1, subtotal: 199.90 },
        { id: 6, produto: { id: 4, nome: 'Coleira', preco: 39.90 }, quantidade: 2, subtotal: 79.80 }
      ],
      total: 279.70,
      status: 'concluida',
      formaPagamento: 'pix'
    },
    {
      id: 4,
      data: '2024-03-12',
      cliente: { id: 1, nome: 'João Silva' },
      itens: [
        { id: 7, servico: { id: 3, nome: 'Vacinação', preco: 180.00 }, quantidade: 1, subtotal: 180.00 },
        { id: 8, produto: { id: 5, nome: 'Shampoo Especial', preco: 59.90 }, quantidade: 1, subtotal: 59.90 }
      ],
      total: 239.90,
      status: 'concluida',
      formaPagamento: 'cartao'
    },
    {
      id: 5,
      data: '2024-03-11',
      cliente: { id: 4, nome: 'Ana Costa' },
      itens: [
        { id: 9, produto: { id: 6, nome: 'Ração Premium', preco: 89.90 }, quantidade: 3, subtotal: 269.70 },
        { id: 10, servico: { id: 4, nome: 'Banho e Tosa', preco: 120.00 }, quantidade: 1, subtotal: 120.00 }
      ],
      total: 389.70,
      status: 'concluida',
      formaPagamento: 'cartao'
    }
  ];

  private estatisticasPetMock: EstatisticasPet[] = [
    {
      tipo: 'Cachorro',
      raca: 'Labrador',
      itens: [
        { item: { id: 1, nome: 'Ração Premium', tipo: 'produto' as const }, quantidade: 15 },
        { item: { id: 1, nome: 'Banho e Tosa', tipo: 'servico' as const }, quantidade: 8 }
      ]
    },
    {
      tipo: 'Gato',
      raca: 'Siamês',
      itens: [
        { item: { id: 2, nome: 'Ração Especial', tipo: 'produto' as const }, quantidade: 12 },
        { item: { id: 2, nome: 'Consulta Veterinária', tipo: 'servico' as const }, quantidade: 5 }
      ]
    }
  ];

  public async obterTopClientesPorQuantidade(): Promise<EstatisticasConsumo[]> {
    const estatisticasClientes = new Map<number, EstatisticasConsumo>();

    this.vendasMock.forEach(venda => {
      const clienteId = venda.cliente.id;
      const estatisticasAtuais = estatisticasClientes.get(clienteId) || {
        cliente: {
          id: venda.cliente.id,
          nome: venda.cliente.nome
        },
        quantidade: 0,
        valor: 0
      };

      estatisticasAtuais.quantidade += venda.itens.reduce((soma, item) => soma + item.quantidade, 0);
      estatisticasAtuais.valor += venda.total;

      estatisticasClientes.set(clienteId, estatisticasAtuais);
    });

    return Array.from(estatisticasClientes.values())
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 10);
  }

  public async obterItensMaisConsumidos(): Promise<EstatisticasItem[]> {
    const estatisticasItens = new Map<string, EstatisticasItem>();

    this.vendasMock.forEach(venda => {
      venda.itens.forEach(item => {
        const dadosItem = item.produto || item.servico;
        if (!dadosItem) return;

        const chave = `${item.produto ? 'produto' : 'servico'}-${dadosItem.id}`;
        const estatisticasAtuais = estatisticasItens.get(chave) || {
          item: {
            id: dadosItem.id,
            nome: dadosItem.nome,
            tipo: item.produto ? 'produto' : 'servico'
          },
          quantidade: 0
        };

        estatisticasAtuais.quantidade += item.quantidade;
        estatisticasItens.set(chave, estatisticasAtuais);
      });
    });

    return Array.from(estatisticasItens.values())
      .sort((a, b) => b.quantidade - a.quantidade);
  }

  public async obterConsumoPorTipoRaca(): Promise<EstatisticasPet[]> {
    return this.estatisticasPetMock;
  }

  public async obterTopClientesPorValor(): Promise<EstatisticasConsumo[]> {
    const estatisticasClientes = new Map<number, EstatisticasConsumo>();

    this.vendasMock.forEach(venda => {
      const clienteId = venda.cliente.id;
      const estatisticasAtuais = estatisticasClientes.get(clienteId) || {
        cliente: {
          id: venda.cliente.id,
          nome: venda.cliente.nome
        },
        quantidade: 0,
        valor: 0
      };

      estatisticasAtuais.quantidade += venda.itens.reduce((soma, item) => soma + item.quantidade, 0);
      estatisticasAtuais.valor += venda.total;

      estatisticasClientes.set(clienteId, estatisticasAtuais);
    });

    return Array.from(estatisticasClientes.values())
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);
  }
} 