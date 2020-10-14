export function calcDate(isoDate) {
    const parsedDate = new Date(isoDate)
    const month = parsedDate.getUTCMonth() + 1
    const day = parsedDate.getUTCDate()
    const year = parsedDate.getUTCFullYear()
    const hour = parsedDate.getUTCHours()
    const min = parsedDate.getUTCMinutes()
    return `${month}-${day}-${year} ${hour}:${min}`
}

export function getAllCategories(categories) {
    const results = []
    for (let i = 0; i < categories.length; i++) {
        if (!results.includes(categories[i])) {
            results.push(categories[i])
        }
    }
    return results
}

export function pillColor(category) {
    switch (category) {
        case 'Mystery':
            return 'success'
        case 'Drama':
            return 'danger'
        case 'Recipe':
            return 'info'
        case 'How-to':
            return 'danger'
        default:
            return 'secondary'
    }
}

export function borderColor(category) {
    switch (category) {
        case 'Mystery':
            return '#28a745'
        case 'Recipe':
            return '#17a2b8'
        case 'Drama':
            return '#dc3545'
        case 'How-to':
            return '#dc3545'
        default:
            return 'grey'
    }
}

export function confirmPassword(password, confirmPassword) {
    if (password === confirmPassword) {
        return true
    } else {
        return false
    }
}

export function passwordStrength(password) {
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let containsSpecialCharacter
    let containsNumber
    let message = []

    for (let i = 0; i < password.length; i++) {
        if (specialCharacters.includes(password[i])) {
            containsSpecialCharacter = true
        }
    }

    for (let i = 0; i < password.length; i++) {
        if (numbers.includes(password[i])) {
            containsNumber = true
        }
    }

    if (!containsSpecialCharacter) message.push('Must contain a special character')
    if (password.length <= 8) message.push('Must be at least 8 characters in length')
    if (password.toLowerCase() === password) message.push('Must contain at least one capital letter')
    if (!containsNumber) message.push('Must contain at least one number')
    return message
}