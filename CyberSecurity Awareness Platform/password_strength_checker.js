document.getElementById('password').addEventListener('input', updateStrengthMeter);
document.getElementById('show-password').addEventListener('change', togglePasswordVisibility);

function updateStrengthMeter() {
    const password = document.getElementById('password').value;
    const strengthMeter = document.getElementById('strength-fill');
    const feedback = document.getElementById('strength-feedback');
    const suggestions = document.getElementById('suggestions');
    
    let strength = calculatePasswordStrength(password);
    
    // Update the strength bar width and color
    strengthMeter.style.width = strength.percent + '%';
    strengthMeter.style.backgroundColor = strength.color;
    
    // Update the feedback and suggestions
    feedback.textContent = strength.message;
    suggestions.innerHTML = generateSuggestions(password);
}

// Function to calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;

    // Criteria for password strength
    const lengthCriteria = password.length >= 8;
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Increment strength based on the criteria
    if (lengthCriteria) strength += 20;
    if (lowercaseCriteria) strength += 20;
    if (uppercaseCriteria) strength += 20;
    if (numberCriteria) strength += 20;
    if (symbolCriteria) strength += 20;

    // Determine the password strength message and color
    let strengthMessage = '';
    let strengthColor = '';

    if (strength <= 40) {
        strengthMessage = 'Weak';
        strengthColor = '#ff4d4d'; // Red
    } else if (strength <= 60) {
        strengthMessage = 'Moderate';
        strengthColor = '#ffcc00'; // Yellow
    } else if (strength <= 80) {
        strengthMessage = 'Strong';
        strengthColor = '#66cc66'; // Green
    } else {
        strengthMessage = 'Very Strong';
        strengthColor = '#009900'; // Dark Green
    }

    return {
        percent: strength,
        message: strengthMessage,
        color: strengthColor
    };
}

// Function to toggle the password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// Generate suggestions to improve password strength
function generateSuggestions(password) {
    let suggestions = [];

    if (password.length < 8) {
        suggestions.push('<li>Use at least 8 characters.</li>');
    }
    if (!/[A-Z]/.test(password)) {
        suggestions.push('<li>Add at least one uppercase letter (A-Z).</li>');
    }
    if (!/[a-z]/.test(password)) {
        suggestions.push('<li>Add at least one lowercase letter (a-z).</li>');
    }
    if (!/[0-9]/.test(password)) {
        suggestions.push('<li>Include at least one number (0-9).</li>');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        suggestions.push('<li>Include at least one special character (e.g., !, @, #, $, etc.).</li>');
    }

    if (suggestions.length === 0) {
        return '<p>Your password is strong!</p>';
    }

    return '<ul>' + suggestions.join('') + '</ul>';
}
