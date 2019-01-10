export const validateId = id => /^\d+$/.test(id)

export const validateTitle = title => title.length <= 50

export const validateYear = year => parseInt(year.split('-')[0]) >= 1893

export const validateDirector = director => /^[A-Z]([a-zA-Z]|\.| |-|')+$/.test(director)
