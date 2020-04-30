$(document).ready(() => {
    const boot = () => {
        window.localStorage.getItem('user') ? 
            window.location.href = './src/dashboard/dashboard.html' 
            : window.location.href = './src/login/login.html'
    }

    boot();
});

