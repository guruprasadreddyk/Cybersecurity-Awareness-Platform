// Hashing functions using CryptoJS
function hashText(algorithm, text) {
    let hash;

    if (algorithm === 'md5') {
        hash = CryptoJS.MD5(text).toString();
    } else if (algorithm === 'sha256') {
        hash = CryptoJS.SHA256(text).toString();
    } else if (algorithm === 'sha1') {
        hash = CryptoJS.SHA1(text).toString();
    }

    return hash;
}

// Main hashing logic
document.getElementById('hashBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const algorithm = document.getElementById('algorithm').value;

    // Hash the input text based on the selected algorithm
    const hashedText = hashText(algorithm, plaintext);

    // Display the hashed result
    document.getElementById('hashedOutput').textContent = hashedText || 'Please enter some text.';
});
