document.getElementById('diagnosticoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    let htmlContent = '';

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

    // Gera os blocos de pergunta e resposta
    for (let [chave, valor] of formData.entries()) {
        if(valor.trim() !== "") {
            // A regra page-break-inside: avoid impede que o texto corte no meio da página
            htmlContent += `<div style="page-break-inside: avoid; margin-bottom: 15px; font-size: 14px; line-height: 1.5; text-align: justify;">
                                <strong>${perguntas[chave]}:</strong><br> ${valor}
                            </div>`;
        }
    }

    // Constrói o documento final direto no JS
    const conteudoPDF = `
        <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <h2 style="text-align: center; color: #0056b3; font-size: 22px; margin-bottom: 10px;">
                Relatório de Diagnóstico de Desassentamento
            </h2>
            <hr style="margin-bottom: 20px;">
            ${htmlContent}
        </div>
    `;

    // Novas configurações com margens reais e controle de quebra de página
    const opcoes = {
        margin:       [15, 15, 15, 15], // Margem [Cima, Direita, Baixo, Esquerda] em mm
        filename:     'Diagnostico_Desassentamento.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, windowWidth: 800 }, // Força uma largura para não estourar a tela
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Gera o PDF diretamente a partir da string HTML
    html2pdf().set(opcoes).from(conteudoPDF).save().then(() => {
        alert("PDF gerado com sucesso!");
    });
});