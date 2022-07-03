const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// function to create ids based on random numbers
function generateString(len) {
    let result = "";
    const charactersLength = CHARACTERS.length;
    for (let i = 0; i < len; i++) {
        result += CHARACTERS.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export default generateString;