class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, ocupacao: 3, especies: ['MACACO'] },
      { numero: 2, bioma: 'floresta', tamanho: 5, ocupacao: 0, especies: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupacao: 2, especies: ['GAZELA'] },
      { numero: 4, bioma: 'rio', tamanho: 8, ocupacao: 0, especies: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, ocupacao: 3, especies: ['LEAO'] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(animal, quantidade) {
    //Existencia de animal
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, biomas, carnivoro } = this.animais[animal];
    //Calcula ocupação total
    const totalOcupacao = tamanho * quantidade;
    let recintosViaveis = [];

    this.recintos.forEach(recinto => {
      //Verifica espaço livre e confronta com o espaço disponivel
      const espacoLivre = recinto.tamanho - recinto.ocupacao;
      const haCarnivoro = recinto.especies.some(especie => this.animais[especie].carnivoro);
      const biomaCompativel = biomas.includes(recinto.bioma);
      const espacoSuficiente = espacoLivre >= totalOcupacao;
      const semCarnivoroDiferente = !(carnivoro && haCarnivoro && !recinto.especies.includes(animal));
       //Se houver espaço faça a verificação e aloca o animal
      if (biomaCompativel && espacoSuficiente && semCarnivoroDiferente) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - totalOcupacao} total: ${recinto.tamanho})`
        );
      }
    });
  /// Se não houver retorna a mensagem
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}




export { RecintosZoo as RecintosZoo };


