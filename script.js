
document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeOffIcon = document.getElementById('eyeOffIcon');

    const strengthContainer = document.getElementById('strengthContainer');
    const strengthText = document.getElementById('strengthText');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const btnSpinner = document.getElementById('btnSpinner');
    const successCard = document.getElementById('successCard');
    const cardFooter = document.getElementById('cardFooter');

    // 1. Mostrar / Ocultar Senha
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        eyeIcon.classList.toggle('hidden', isPassword);
        eyeOffIcon.classList.toggle('hidden', !isPassword);
    });

    // 2. Cálculo da Força da Senha
    const updateStrengthMeter = (val) => {
        if (!val) {
            strengthContainer.classList.add('hidden');
            return;
        }
        strengthContainer.classList.remove('hidden');

        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10 || (/[A-Z]/.test(val) && /[0-9]/.test(val))) score++;
        if (/[^A-Za-z0-9]/.test(val) && val.length >= 8) score++;

        // Reset das barras
        [bar1, bar2, bar3].forEach(b => b.className = 'h-full w-1/3 bg-gray-200 transition-all duration-300');

        if (score === 1) {
            strengthText.textContent = 'Fraca';
            strengthText.className = 'text-[11px] font-semibold text-amber-500';
            bar1.className = 'h-full w-1/3 bg-amber-400 transition-all duration-300';
        } else if (score === 2) {
            strengthText.textContent = 'Média';
            strengthText.className = 'text-[11px] font-semibold text-lime-600';
            bar1.className = 'h-full w-1/3 bg-lime-400 transition-all duration-300';
            bar2.className = 'h-full w-1/3 bg-lime-400 transition-all duration-300';
        } else if (score >= 3) {
            strengthText.textContent = 'Forte';
            strengthText.className = 'text-[11px] font-semibold text-emerald-600';
            bar1.className = 'h-full w-1/3 bg-emerald-500 transition-all duration-300';
            bar2.className = 'h-full w-1/3 bg-emerald-500 transition-all duration-300';
            bar3.className = 'h-full w-1/3 bg-emerald-500 transition-all duration-300';
        }
    };

    passwordInput.addEventListener('input', (e) => {
        updateStrengthMeter(e.target.value);
        if (e.target.value.length >= 6) {
            passwordError.classList.add('hidden');
            passwordInput.classList.remove('border-amber-500', 'bg-amber-50/20');
        }
    });

    // 3. Validação do E-mail em tempo real
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value.trim())) {
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-amber-500', 'bg-amber-50/20');
        }
    });

    // 4. Envios do Formulário
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailVal = emailInput.value.trim();
        const passVal = passwordInput.value.trim();
        let valid = true;

        // Valida e-mail
        if (!emailVal || !isValidEmail(emailVal)) {
            emailError.classList.remove('hidden');
            emailInput.classList.add('border-amber-500', 'bg-amber-50/20');
            valid = false;
        } else {
            emailError.classList.add('hidden');
        }

        // Valida senha
        if (!passVal || passVal.length < 6) {
            passwordError.classList.remove('hidden');
            passwordInput.classList.add('border-amber-500', 'bg-amber-50/20');
            valid = false;
        } else {
            passwordError.classList.add('hidden');
        }

        if (!valid) return;

        // Animação do Botão (Loading state)
        btnText.textContent = 'Verificando...';
        btnIcon.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-90', 'cursor-not-allowed');

        // Simulação de requisição de login (1.5s)
        setTimeout(() => {
            loginForm.classList.add('hidden');
            successCard.classList.remove('hidden');
            cardFooter.classList.add('hidden');
        }, 1500);
    });
});