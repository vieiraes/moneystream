// Inicie as variáveis com zero
let watchTimeInSeconds = 0;
let bitsEarned = 0;
const bitsPerFiveSeconds = 0.02567;
let isTimerRunning = false;
let timerInterval;
let redeemsAvailable = 3; // Contagem de resgates disponíveis

// Função para atualizar o watch time e bits a cada segundo
function updateWatchTime() {
    // Incrementa o contador de tempo cada segundo
    watchTimeInSeconds++;

    // Atualize o contador de tempo do usuário para exibição
    const userTimeCounter = document.getElementById('user-time-counter');
    userTimeCounter.textContent = formatTime(watchTimeInSeconds);

    // A cada 5 segundos incrementa os bits
    if (watchTimeInSeconds % 5 === 0) {
        bitsEarned += bitsPerFiveSeconds;
        document.getElementById('bits-earned-counter').textContent = bitsEarned.toFixed(5);
    }
}

// Função para formatar o número de segundos para o formato HH:MM:SS
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

// Configura o evento do botão de controle do vídeo
document.getElementById('toggle-timer-btn').addEventListener('click', function () {
    const btn = this;
    if (!isTimerRunning) {
        timerInterval = setInterval(updateWatchTime, 1000);
        btn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        clearInterval(timerInterval);
        btn.innerHTML = '<i class="fa fa-play"></i>';
    }
    isTimerRunning = !isTimerRunning;
});

// Evento de resgate dos bits
document.getElementById('redeem-bits-btn').addEventListener('click', function () {
    const redeemError = document.getElementById('redeem-error');
    const earnedBitsSpan = document.getElementById('bits-earned-counter');
    const walletBalanceSpan = document.getElementById('wallet-balance');
    const redeemsAvailableSpan = document.getElementById('redeems-available');

    if (redeemsAvailable > 0) {
        redeemError.style.display = 'none'; // Esconde a mensagem de erro caso ainda haja resgates

        const earnedBits = parseFloat(earnedBitsSpan.textContent);
        const walletBalance = parseFloat(walletBalanceSpan.textContent) || 0;

        // Transferir Bs$ Acumulados para Saldo Bs$ na wallet
        const newWalletBalance = walletBalance + earnedBits;
        walletBalanceSpan.textContent = newWalletBalance.toFixed(5);

        // Resetar Bs$ Acumulados
        bitsEarned = 0;
        earnedBitsSpan.textContent = bitsEarned.toFixed(5);

        // Decrementar o número de resgates disponíveis e atualizar a exibição
        redeemsAvailable -= 1;
        redeemsAvailableSpan.textContent = redeemsAvailable.toString();
    } else {
        redeemError.style.display = 'block'; // Mostra a mensagem de erro
    }
});