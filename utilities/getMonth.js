module.exports = () => {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    return month+'-'+year;
}