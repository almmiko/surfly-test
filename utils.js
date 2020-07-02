const generateID = () => '_' + Math.random().toString(36).substr(2, 9);
const generateColor = () => Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
    generateID,
    generateColor
}