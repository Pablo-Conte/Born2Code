<h1>Born2Code Project</h1>

This is a project developed for the Born2Code, an rest API.

---

Utilizando o gitflow, vamos codar sempre a partir da branch de `develop` criando branchs adicionais de acordo com a necessidade.

- Para novas features, utilizar o prefixo: `feature/nome_da_feature`
- Para correções de bug, utilizar o prefixo: `bugfix/nome_da_feature`

1. Uma nova branch deve ser criada para cada card
2. Ao finalizar o card, o mesmo pode ser enviado para code review, que deve ser feito antes de subir para `develop`
3. Antes de subir para `develop` (merge), deve ser feito um `git pull --rebase` na branch de develop para pegar possíveis mudanças que já subiram
4. O último a subir deve resolver todos os conflitos
5. Após efetuar o merge, a branch utilizada pode ser arquivada
6. Ao finalizar todas as tarefas da sprint, deve ser criada uma branch de release seguindo o padrão `release/numero_da_versao` (Nunca deve ser apagada)
7. Essa release pode ser mergeada em `homolog`, lembrando sempre de fazer um `rebase` em homolog para pegar possíveis mudanças.
8. Apenas ao final da homologação do pacote, pode ser feito o merge em produção (branch main)