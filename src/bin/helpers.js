export const clearForm = self => {
    const keys = Object.keys(self.state)
    const nextState = {}
    keys.forEach(key => nextState[key] = '')
    self.setState(nextState)
}