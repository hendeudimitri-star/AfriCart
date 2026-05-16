// Login Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input');
        const email = inputs[0].value;
        const password = inputs[1].value;
        const remember = inputs[2].checked;
        
        // Simulate login (in real app, verify with backend)
        const user = {
            email: email,
            firstName: email.split('@')[0],
            lastName: 'User',
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        alert('Connecté avec succès !');
        window.location.href = 'account.html';
    });
});
