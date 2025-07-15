// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeDropdown = document.getElementById('theme-dropdown');
    const themeOptions = themeDropdown.querySelectorAll('button');
    const body = document.body;

    const applyTheme = (theme) => {
        body.classList.remove('light-mode', 'dark-mode');
        localStorage.setItem('theme', theme);

        let displayTheme = theme;
        if (theme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                body.classList.add('dark-mode');
            }
            displayTheme = 'SYSTEM';
        } else if (theme === 'dark') {
            body.classList.add('dark-mode');
            displayTheme = 'DARK';
        } else {
            body.classList.add('light-mode');
            displayTheme = 'LIGHT';
        }
        themeToggleButton.textContent = `(${displayTheme})`;
    };

    themeToggleButton.addEventListener('click', () => {
        themeDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!themeToggleButton.contains(e.target) && !themeDropdown.contains(e.target)) {
            themeDropdown.classList.add('hidden');
        }
    });

    themeOptions.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
            themeDropdown.classList.add('hidden');
        });
    });

    // On load, apply saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
});