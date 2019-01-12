export const titleCase = str => str.charAt(0).toUpperCase() + str.slice(1)

export const sortNestedObject = (values, type, keyArr=null, ascending=true) => {
  return values.sort((a, b) => {
      const keys = [...keyArr]
      let compareA = a
      let compareB = b

      if(keyArr) {
          while (keys.length > 0) {
              const key = keys.shift()
              compareA = compareA[key]
              compareB = compareB[key]
          }
        }

      if (type === 'numeric') {
        compareA = Number(compareA)
        compareB = Number(compareB)
        return ascending ? compareA - compareB : compareB - compareA
      }

      if (type === 'alphabetical') {
        compareA = compareA ? String(compareA).toLowerCase() : ''
        compareB = compareB ? String(compareB).toLowerCase(): ''
        return compareA > compareB ? (ascending ? 1 : -1) : (ascending ? -1 : 1)
      }

      if (type === 'date') {
        compareA = compareA ? new Date(compareA) : new Date('0000-01-01')
        compareB = compareB ? new Date(compareB): new Date('0000-01-01')
        return ascending ? compareA - compareB : compareB - compareA
      }

      return 0
  })
}

export const generateNestedState = (prevState, nestedKey, newNestedValues) => {
  const nextNestedState = { [nestedKey]: {
      ...prevState[nestedKey], 
      ...newNestedValues
    }
  }
  return { ...prevState, ...nextNestedState }
}