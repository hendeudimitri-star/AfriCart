// Signup Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input');
        const firstName = inputs[0].value;
        const lastName = inputs[1].value;
        const email = inputs[2].value;
        const password = inputs[3].value;
        const confirmPassword = inputs[4].value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas !');
            return;
        }
        
        // Validate password strength
        if (password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères !');
            return;
        }
        
        // Create user
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        alert('Compte créé avec succès ! Vous êtes maintenant connecté.');
        window.location.href = 'account.html';
    });
});
