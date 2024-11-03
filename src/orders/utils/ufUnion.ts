export type ufUnion =
  'AL'
| 'BA'
| 'CE'
| 'MA'
| 'PB'
| 'PE'
| 'PI'
| 'RN'
| 'SE'

export function isValidUF(uf: ufUnion | string): uf is ufUnion {
    return ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'].includes(uf)
  }