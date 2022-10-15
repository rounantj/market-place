export function OrdenaJson(lista, chave, ordem) {
  return lista.sort(function (a, b) {
    var x = a[chave]
    var y = b[chave]
    if (ordem === 'ASC') {
      return x < y ? -1 : x > y ? 1 : 0
    }
    if (ordem === 'DESC') {
      return x > y ? -1 : x < y ? 1 : 0
    }
  })
}
