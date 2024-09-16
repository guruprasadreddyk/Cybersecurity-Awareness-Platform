function caesarCipher(str, shift) {
    let result = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        if (alphabet.indexOf(char.toLowerCase()) !== -1) {
            let isUpperCase = char === char.toUpperCase();
            char = char.toLowerCase();

            let newPosition = (alphabet.indexOf(char) + shift) % alphabet.length;
            if (newPosition < 0) newPosition += alphabet.length;

            let newChar = alphabet[newPosition];
            if (isUpperCase) newChar = newChar.toUpperCase();

            result += newChar;
        } else {
            result += char;
        }
    }
    return result;
}

function aesEncrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
}

function desEncrypt(text, key) {
    return CryptoJS.DES.encrypt(text, key).toString();
}

function rsaEncrypt(text, publicKey) {
    try {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const encrypted = encrypt.encrypt(text);
        if (!encrypted) {
            throw new Error('Encryption failed, possibly due to an invalid key.');
        }
        return encrypted;
    } catch (e) {
        console.error('Error encrypting with RSA:', e);
        return 'Encryption failed. Please check the key and try again.';
    }
}
// Toggle visibility of the Caesar cipher shift option
document.getElementById('algorithm').addEventListener('change', function() {
    const algorithm = this.value;
    document.getElementById('caesarShift').style.display = (algorithm === 'caesar') ? 'block' : 'none';
    document.getElementById('encryptionKey').style.display = (algorithm === 'caesar') ? 'none' : 'block';
});

// Main encryption logic
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const algorithm = document.getElementById('algorithm').value;
    const key = document.getElementById('key').value;
    const shift = parseInt(document.getElementById('shift').value, 10);

    let encryptedText = '';

    if (algorithm === 'caesar') {
        encryptedText = caesarCipher(plaintext, shift);
    } else if (algorithm === 'aes') {
        if (!key) {
            alert('Please provide a valid Encryption key!');
            return;
        }
        encryptedText = aesEncrypt(plaintext, key);
    } else if (algorithm === 'des') {
        if (!key) {
            alert('Please provide a valid Encryption key!');
            return;
        }
        encryptedText = desEncrypt(plaintext, key);
    } else if (algorithm === 'rsa') {
        if (!key) {
            alert('Please provide a valid Encryption key!');
            return;
        }
        encryptedText = rsaEncrypt(plaintext, key);
    } else {
        encryptedText = 'Please select an algorithm.';
    }

    document.getElementById('encryptedOutput').textContent = encryptedText || 'Please enter some text and select an algorithm.';
});
document.getElementById('algorithm').addEventListener('change', function() {
    // Hide all flowcharts
    document.querySelectorAll('.flowchart').forEach(function(flowchart) {
        flowchart.style.display = 'none';
    });

    // Get the selected algorithm
    var selectedAlgorithm = this.value;

    // Show the corresponding flowchart
    var flowchartId;
    if (selectedAlgorithm === 'caesar') {
        flowchartId = 'flowchart-caesar';
    } else if (selectedAlgorithm === 'aes') {
        flowchartId = 'flowchart-aes';
    } else if (selectedAlgorithm === 'des') {
        flowchartId = 'flowchart-des';
    } else if (selectedAlgorithm === 'rsa') {
        flowchartId = 'flowchart-rsa';
    }

    // Show the selected flowchart and re-render it with mermaid
    if (flowchartId) {
        var flowchart = document.getElementById(flowchartId);
        flowchart.style.display = 'block';
        mermaid.init(undefined, flowchart); // Re-render the flowchart using mermaid
    }
});
