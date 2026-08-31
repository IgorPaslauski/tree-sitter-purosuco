; Tree-sitter highlight queries for PuroSuco

[
  "AMOSTRADINHO"
  "NA_MIÚDA"
  "NA_MIUDA"
  "SO_OS_DE_VERDADE"
  "SO_NA_TEORIA"
  "SEMPRE_FOI_ASSIM"
  "NAO_MEXE"
  "BROTOU"
  "EU_MESMO"
] @keyword.modifier

[
  "TA_CERTO_ISSO"
  "NAO_TA_NAO"
  "ENQUANTO_TANKAR"
  "BORA_BILL"
  "CHEGA"
  "SEGUE_O_JOGO"
  "VAI_DAR_BOM"
  "METEU_ESSA"
  "DE_QUALQUER_JEITO"
  "AI_TU_ME_QUEBRA"
  "TOMA"
  "JA_VAI"
  "PERAI"
] @keyword.control

[
  "PAPO"
  "NUMERO"
  "NUMERO_QUEBRADO"
  "CONFERE"
  "VOLTA_NADA"
  "SEI_LA"
  "TROPA"
  "PAPO_RETO"
] @type

(type) @type

[
  "CONFIA"
  "CONFIA_NAO"
  "TEM_NADA_AI"
] @constant.builtin

(boolean) @constant.builtin
(null_literal) @constant.builtin

[
  "MANDA_AI"
  "FALA_TU"
] @function.builtin

(class_declaration
  "TROPA" @keyword
  name: (identifier) @type.class)

(function_declaration
  name: (identifier) @function)

(call_expression
  (identifier) @function)

"RECEBA" @keyword.operator

[
  "+"
  "-"
  "*"
  "/"
  "=="
  "!="
  ">="
  "<="
  ">"
  "<"
] @operator

(comment) @comment
(string) @string
(number) @number
(identifier) @variable
