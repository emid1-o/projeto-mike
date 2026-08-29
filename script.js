document.getElementById('diagnosticoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Captura os dados do formulário usando FormData
    const formData = new FormData(this);
    
    // Constrói o conteúdo em HTML para o PDF
    let htmlContent = '';
    
    // Lista de mapeamento das perguntas para ficar bonito no PDF
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

    // Gera os parágrafos com Pergunta em negrito e a Resposta
    for (let [chave, valor] of formData.entries()) {
        if(valor.trim() !== "") {
            htmlContent += `<p style="margin-bottom: 10px; font-size: 14px; line-height: 1.5;">
                                <strong>${perguntas[chave]}:</strong><br> ${valor}
                            </p>`;
        }
    }

    // Insere o conteúdo no template oculto
    document.getElementById('pdfContent').innerHTML = htmlContent;

    // Configurações do gerador de PDF
    const elementoParaPDF = document.getElementById('pdfTemplate');
    elementoParaPDF.classList.remove('d-none'); // Torna visível temporariamente para o gerador

    const opcoes = {
        margin:       10,
        filename:     'Diagnostico_Desassentamento.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera e salva o PDF
    html2pdf().set(opcoes).from(elementoParaPDF).save().then(() => {
        elementoParaPDF.classList.add('d-none'); // Esconde novamente após gerar
        alert("PDF gerado com sucesso!");
    });
});