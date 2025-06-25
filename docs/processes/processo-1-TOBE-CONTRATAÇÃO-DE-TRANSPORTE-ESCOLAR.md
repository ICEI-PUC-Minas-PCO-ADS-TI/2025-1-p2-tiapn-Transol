### Processo 1 – CONTRATAÇÃO DE TRANSPORTE ESCOLAR
Depois de analisar o processo atual (AS-IS), foi possível ver que ele é muito manual, depende de várias conversas no WhatsApp e tem etapas repetitivas. Tudo isso deixa o atendimento mais demorado e confuso. A proposta do novo processo (TO-BE) é deixar tudo mais rápido e organizado usando a tecnologia. O cliente continua entrando em contato pelo WhatsApp, mas já recebe um link com um formulário para preencher os dados. A partir daí, o sistema cuida de tudo: verifica se tem vaga, calcula o valor da mensalidade, gera o contrato e envia a chave PIX para o pagamento. Depois que o cliente paga, o sistema confirma e avisa que o aluno foi incluído na rota da van. O atendente só entra se for necessário, como em casos de dúvidas ou se o pagamento não for identificado automaticamente. Isso ajuda a equipe a ganhar tempo e focar em outras tarefas importantes.

### Oportunidades de melhoria
•	Atendimento mais rápido e com menos esforço.
•	Menos erros e mais organização nas informações.
•	Processo padronizado, sem vai-e-volta.
•	Atendente disponível para casos mais importantes.
•	Melhor experiência para o cliente.
### Limites da solução
•	Se o pagamento não for identificado automaticamente, o atendente precisa verificar.
•	É necessário ter um sistema e internet para usar o formulário e as automações.
•	Algumas pessoas podem ter dificuldade com tecnologia.

### Alinhamento com os objetivos do negócio
Esse novo processo ajuda o serviço de transporte escolar a crescer, atendendo mais pessoas com mais agilidade e organização. Também melhora a comunicação e a experiência de quem contrata.


![image](https://github.com/user-attachments/assets/6d367e26-ff6e-48d8-a28b-13e6038d15a4)



#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


## Processo 1 – Contratação de Transporte Escolar

### Atividade 1 – Preenchimento do Formulário de Contratação
| Campo               | Tipo           | Restrições                          | Valor default |
| ------------------- | -------------- | ------------------------------------ | --------------|
| Nome do responsável | Caixa de Texto | Obrigatório                         | —             |
| CPF                 | Caixa de Texto | Formato CPF (000.000.000-00)        | —             |
| Telefone            | Caixa de Texto | Obrigatório – Formato (XX) XXXXX-XXXX | —           |
| E-mail              | Caixa de Texto | Formato de e-mail                   | —             |
| Endereço            | Área de Texto  | Obrigatório                         | —             |
| Nome do aluno       | Caixa de Texto | Obrigatório                         | —             |
| Escola              | Seleção única  | Lista de escolas cadastradas        | —             |
| Turno               | Seleção única  | Manhã / Tarde / Integral            | —             |
| Observações         | Área de Texto  | Opcional                            | —             |

| Comandos          | Destino                        | Tipo    |
| ----------------- | ------------------------------- | ------- |
| Enviar formulário | Verificar disponibilidade e preço | default |
| Cancelar          | Fim do processo                 | cancel  |

### Atividade 2 – Verificar Disponibilidade e Gerar Contrato
| Campo                    | Tipo           | Restrições                         | Valor default |
| ------------------------ | -------------- | ----------------------------------- | --------------|
| Status de disponibilidade| Seleção única  | Disponível / Indisponível          | —             |
| Valor da mensalidade     | Número         | Somente números positivos          | —             |
| Link para contrato gerado| Link           | Gerado automaticamente             | —             |
| Chave PIX                | Caixa de Texto | Obrigatório                        | —             |
| Prazo para pagamento     | Data           | Data limite                        | —             |

| Comandos                  | Destino                           | Tipo    |
| ------------------------- | ---------------------------------- | ------- |
| Enviar contrato e PIX     | Aguardar pagamento                | default |
| Voltar para cadastro      | Preenchimento do Formulário       | cancel  |

### Atividade 3 – Validação do Pagamento
| Campo                     | Tipo           | Restrições                          | Valor default |
| ------------------------- | -------------- | ------------------------------------ | --------------|
| Comprovante de pagamento  | Arquivo        | Obrigatório se PIX não identificado | —             |
| Status do pagamento       | Seleção única  | Pago / Não pago / Aguardando        | —             |
| Data de confirmação       | Data e Hora    | Gerado automaticamente              | —             |

| Comandos                   | Destino                             | Tipo    |
| -------------------------- | ------------------------------------ | ------- |
| Confirmar pagamento        | Incluir aluno na rota               | default |
| Reenviar PIX               | Verificar disponibilidade e gerar contrato | cancel |

### Atividade 4 – Inclusão na Rota
| Campo                      | Tipo           | Restrições                            | Valor default |
| -------------------------- | -------------- | -------------------------------------- | --------------|
| Rota atribuída             | Seleção única  | Obrigatório – Selecionar da lista de rotas | —          |
| Horário de embarque        | Hora           | Obrigatório                            | —             |
| Motorista responsável      | Caixa de Texto | Obrigatório                            | —             |
| Status                     | Seleção única  | Ativo / Pendente / Cancelado           | Ativo         |

| Comandos                   | Destino         | Tipo    |
| -------------------------- | ----------------| ------- |
| Finalizar contratação      | Fim do Processo | default |
| Cancelar contratação       | Fim do Processo | cancel  |
