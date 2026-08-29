document.getElementById('diagnosticoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const perguntas = {
        comunidade: "Nome da comunidade",
        municipio: "Município/UF",
        empreendimento: "Empreendimento relacionado",
        tipoEmpreendimento: "Tipo de empreendimento",
        orgaoResponsavel: "Órgão/empresa responsável",
        dataAplicacao: "Data da aplicação",
        responsavelDiagnostico: "Responsável pelo diagnóstico",
        numFamilias: "Número de famílias/moradores participantes",
        situacaoComunidade: "Situação da comunidade em relação ao empreendimento",
        tempoMoradia: "Há quanto tempo mora nesta comunidade?",
        pessoasDomicilio: "Quantas pessoas residem no domicílio?",
        fonteRenda: "Qual é a principal fonte de renda da família?",
        atividadeEconomicaLocal: "Atividade econômica dentro da comunidade",
        alteracaoRenda: "Alteração de renda em razão do empreendimento",
        tempoRelacaoLocal: "Há quanto tempo a família possui relação com o local?",
        lugaresImportantes: "Lugares importantes na comunidade",
        relacoesProximas: "Relações de parentesco ou amizade próximas",
        dependenciaProfissional: "Dependência profissional da localização",
        importanciaPermanencia: "Importância de permanecer próximo ao local atual",
        perdasPossiveis: "O que perderia caso tivesse que deixar a área"
    };

    // Formata a data (input type="date" retorna yyyy-mm-dd) para dd/mm/aaaa
    function formatarValor(chave, valor) {
        if (chave === 'dataAplicacao' && valor) {
            const [ano, mes, dia] = valor.split('-');
            return `${dia}/${mes}/${ano}`;
        }
        return valor;
    }

    let htmlContent = '';
    for (let [chave, valor] of formData.entries()) {
        if (valor.trim() !== "" && perguntas[chave]) {
            htmlContent += `
                <div class="item-relatorio">
                    <strong>${perguntas[chave]}:</strong>
                    <p>${formatarValor(chave, valor)}</p>
                </div>`;
        }
    }

    const dataGeracao = new Date().toLocaleDateString('pt-BR');

    const relatorio = document.getElementById('relatorioImpressao');
    relatorio.innerHTML = `
        <h2>Relatório de Diagnóstico de Desassentamento</h2>
        <p class="data-geracao">Gerado em: ${dataGeracao}</p>
        <hr>
        ${htmlContent}
    `;

    // Dispara o diálogo de impressão nativo do navegador.
    // O usuário escolhe "Salvar como PDF" como destino.
    window.print();
});
