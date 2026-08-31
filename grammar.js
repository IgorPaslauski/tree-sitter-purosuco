module.exports = grammar({
  name: 'purosuco',

  conflicts: $ => [
    [$.function_declaration, $.variable_declaration],
    [$.variable_declaration],
    [$.assignment_statement]
  ],

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._member),

    _member: $ => choice(
      $.class_declaration,
      $.function_declaration,
      $._statement
    ),

    class_declaration: $ => seq(
      repeat($.modifier),
      'TROPA',
      $.identifier,
      '{',
      repeat($._member),
      '}'
    ),

    function_declaration: $ => seq(
      repeat($.modifier),
      $.type,
      $.identifier,
      '(',
      optional($.parameter_list),
      ')',
      $.block
    ),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.type,
      $.identifier
    ),

    modifier: $ => choice(
      'AMOSTRADINHO',
      'NA_MIÚDA',
      'NA_MIUDA',
      'SO_OS_DE_VERDADE',
      'SO_NA_TEORIA',
      'SEMPRE_FOI_ASSIM',
      'NAO_MEXE'
    ),

    type: $ => choice(
      'PAPO',
      'NUMERO',
      'NUMERO_QUEBRADO',
      'CONFERE',
      'VOLTA_NADA',
      'SEI_LA',
      'PAPO_RETO'
    ),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    _statement: $ => choice(
      $.variable_declaration,
      $.assignment_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.expression_statement
    ),

    variable_declaration: $ => seq(
      $.type,
      $.identifier,
      optional(seq('RECEBA', $._expression)),
      optional(';')
    ),

    assignment_statement: $ => seq(
      $.identifier,
      'RECEBA',
      $._expression,
      optional(';')
    ),

    if_statement: $ => seq(
      'TA_CERTO_ISSO',
      $._expression,
      $.block,
      optional(seq('NAO_TA_NAO', $.block))
    ),

    while_statement: $ => seq(
      'ENQUANTO_TANKAR',
      $._expression,
      $.block
    ),

    for_statement: $ => seq(
      'BORA_BILL',
      optional('('),
      optional(choice($.variable_declaration, $.assignment_statement, $._expression)),
      ';',
      optional($._expression),
      ';',
      optional(choice($.assignment_statement, $._expression)),
      optional(')'),
      $.block
    ),

    return_statement: $ => prec.right(seq(
      'TOMA',
      optional($._expression),
      optional(';')
    )),

    break_statement: $ => seq(
      'CHEGA',
      optional(';')
    ),

    continue_statement: $ => seq(
      'SEGUE_O_JOGO',
      optional(';')
    ),

    expression_statement: $ => seq(
      $._expression,
      optional(';')
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.null_literal,
      $.call_expression,
      $.binary_expression,
      $.parenthesized_expression
    ),

    boolean: $ => choice(
      'CONFIA',
      'CONFIA_NAO'
    ),

    null_literal: $ => 'TEM_NADA_AI',

    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')'
    ),

    call_expression: $ => prec(10, seq(
      choice($.identifier, 'MANDA_AI', 'FALA_TU', 'BROTOU'),
      '(',
      optional($.argument_list),
      ')'
    )),

    argument_list: $ => seq(
      $._expression,
      repeat(seq(',', $._expression))
    ),

    binary_expression: $ => prec.left(choice(
      prec(5, seq($._expression, choice('*', '/'), $._expression)),
      prec(4, seq($._expression, choice('+', '-'), $._expression)),
      prec(3, seq($._expression, choice('>', '<', '>=', '<='), $._expression)),
      prec(2, seq($._expression, choice('==', '!='), $._expression))
    )),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: $ => /\d+(\.\d+)?/,
    string: $ => /"[^"\\]*(\\.[^"\\]*)*"/,
    comment: $ => token(choice(
      seq('//', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    ))
  }
});
