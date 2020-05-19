const calcDate = (isoDate) => {
    const parsedDate = new Date(isoDate)
    return parsedDate.getUTCDate()
}

export default { calcDate }