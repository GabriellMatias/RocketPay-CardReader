# REGEX

  ## Cheatsheet

**Básico**

◦ `/ expression / flags`

Exemplo: `/[A-Z]+/g`

◦ `\` usar caracteres especiais

Exemplo: `/ Oi\?\*\\/` 

◦ `()`agrupador

◦ `|` OU lógico

◦ `Fala Dev` pesquisa exata

◦ `^Fala` o texto inicia com

◦ `Dev$` o texto termina com

**Colchetes**

◦ `[xyz]` qualquer um x, y, z

◦ `[J-Z]` qualquer caracter entre J e Z.

◦ `[^xyz]` nenhum x, y, z

**Classes de caracteres**

◦ `\w` palavra `\d` dígito `\s` espaços em branco (tabs, quebras de linha)

◦ `\W` NÃO palavra `\D` NÃO dígito `\S` NÃO espaços em branco

◦ `\t` tabs, `\n` quebra de linha

◦ `.` qualquer caracter (exceto nova linha)

◦ `mayk|diego` mayk ou diego

◦ `?` zero ou uma ocorrência

◦ `*` zero ou múltiplas ocorrências

◦ `+` uma ou múltiplas ocorrências

◦ `{n}` n ocorrências

◦ `{min,max}` mínima/máxima ocorrências