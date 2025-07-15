// js/guestbook.js
document.addEventListener('DOMContentLoaded', () => {
    // Only run this script if on the Inkdrop page
    if (document.body.id !== 'inkdrop-page') { // Add id="inkdrop-page" to body in inkdrop.html
        return;
    }

    const guestbookInput = document.getElementById('guestbook-input');
    const charCountSpan = document.getElementById('char-count');
    const dropItButton = document.getElementById('drop-it-button');
    const guestbookGrid = document.getElementById('guestbook-grid');
    const guestbookMessage = document.getElementById('guestbook-message');

    const MAX_CHARS = 100;
    const MAX_POSTS_PER_DAY = 3; // IP당 1일 3개 제한
    const userPostHistory = {}; // { 'IP_ADDRESS': [{ timestamp: Date, count: N }] } - Frontend simulation

    // --- Helper Functions ---

    // Display a temporary message to the user
    function displayMessage(message, type = 'info') {
        guestbookMessage.textContent = message;
        guestbookMessage.classList.remove('hidden');
        // Optionally add type-specific classes for styling (e.g., 'error', 'success')
        // guestbookMessage.classList.remove('error', 'success');
        // guestbookMessage.classList.add(type);

        setTimeout(() => {
            guestbookMessage.classList.add('hidden');
        }, 3000); // Hide after 3 seconds
    }

    // Simulate getting user IP (for frontend testing, in real backend this would be server-side)
    function getSimulatedIP() {
        return '192.168.1.100'; // Always return a fixed IP for frontend simulation
    }

    // Check if user has exceeded daily post limit (frontend simulation)
    function checkPostLimit(ip) {
        const today = new Date().toDateString(); // Get today's date string
        userPostHistory[ip] = userPostHistory[ip] || [];

        // Filter out posts not from today
        const todaysPosts = userPostHistory[ip].filter(entry => new Date(entry.timestamp).toDateString() === today);

        return {
            count: todaysPosts.length,
            limitExceeded: todaysPosts.length >= MAX_POSTS_PER_DAY
        };
    }

    // Add post to history (frontend simulation)
    function addPostToHistory(ip) {
        const today = new Date().toDateString();
        const existingEntryIndex = userPostHistory[ip].findIndex(entry => new Date(entry.timestamp).toDateString() === today);

        if (existingEntryIndex > -1) {
            userPostHistory[ip][existingEntryIndex].count++;
            userPostHistory[ip][existingEntryIndex].timestamp = new Date(); // Update timestamp
        } else {
            userPostHistory[ip].push({ timestamp: new Date(), count: 1 });
        }
    }

    // --- Input Area Logic ---

    // Update character count and resize textarea
    function updateInputArea() {
        const currentLength = guestbookInput.value.length;
        charCountSpan.textContent = `${currentLength}/${MAX_CHARS}`;

        // Dynamic height adjustment
        guestbookInput.style.height = 'auto'; // Reset height to recalculate
        const newHeight = guestbookInput.scrollHeight;
        const minHeight = parseFloat(getComputedStyle(guestbookInput).minHeight);
        const maxHeight = parseFloat(getComputedStyle(guestbookInput).maxHeight);

        guestbookInput.style.height = `${Math.min(maxHeight, Math.max(minHeight, newHeight))}px`;
    }

    guestbookInput.addEventListener('input', updateInputArea);

    // Initial update
    updateInputArea();

    // --- Guestbook Entry Submission ---

    dropItButton.addEventListener('click', async () => {
        const entryText = guestbookInput.value.trim();
        const userIP = getSimulatedIP(); // Get simulated IP

        if (entryText.length === 0) {
            displayMessage('방명록 내용을 입력해주세요.', 'error');
            return;
        }
        if (entryText.length > MAX_CHARS) {
            displayMessage(`글자 수 초과: ${entryText.length}/${MAX_CHARS}`, 'error');
            return;
        }

        const { count, limitExceeded } = checkPostLimit(userIP);
        if (limitExceeded) {
            displayMessage(`오늘 작성 가능한 방명록을 모두 작성했습니다. [${count}/${MAX_POSTS_PER_DAY}]`, 'error');
            return;
        }

        // --- Backend 구상 (Placeholder) ---
        // 실제 배포 시에는 이 부분을 백엔드 API 호출로 대체해야 합니다.
        // 예시:
        // try {
        //     const response = await fetch('/api/inkdrop-post', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ text: entryText })
        //     });
        //     const data = await response.json();
        //
        //     if (data.success) {
        //         displayMessage('방명록이 성공적으로 게시되었습니다.', 'success');
        //         addGuestbookEntryToDOM(data.entry.text); // 백엔드에서 받은 실제 데이터를 사용
        //         addPostToHistory(userIP); // 성공 시에만 기록
        //         guestbookInput.value = '';
        //         updateInputArea();
        //     } else {
        //         displayMessage(data.error || '방명록 게시 실패.', 'error');
        //     }
        // } catch (error) {
        //     console.error('Error posting guestbook:', error);
        //     displayMessage('네트워크 오류가 발생했습니다.', 'error');
        // }

        // --- Frontend Simulation (for now) ---
        displayMessage('방명록이 성공적으로 게시되었습니다. (시뮬레이션)', 'success');
        addGuestbookEntryToDOM(entryText);
        addPostToHistory(userIP);
        guestbookInput.value = '';
        updateInputArea();
    });

    // --- Display Guestbook Entries ---

    // Helper function to generate a random ratio class
    function getRandomRatioClass() {
        const ratios = ['ratio-1-1', 'ratio-16-9', 'ratio-4-3', 'ratio-3-4', 'ratio-9-16', 'ratio-2-1', 'ratio-1-2', 'ratio-1-3'];
        return ratios[Math.floor(Math.random() * ratios.length)];
    }

    // Add a single guestbook entry to the DOM
    function addGuestbookEntryToDOM(text) {
        const newEntry = document.createElement('div');
        newEntry.classList.add('thumbnail-box', 'guestbook-entry', getRandomRatioClass());
        newEntry.innerHTML = `
            <div class="content text-only initial-padding">
                <p class="fs-18">${text}</p>
            </div>
        `;
        guestbookGrid.appendChild(newEntry);

        // After adding the new entry, re-initialize thumbnails for the guestbook grid
        // This will position the new entry and ensure no overlaps with existing ones.
        window.initializeThumbnails('guestbook-grid', true); // Enable dragging for guestbook entries
    }

    // Initial load of guestbook entries (frontend simulation)
    function loadGuestbookEntries() {
        const initialEntries = [
            "환영합니다! :)",
            "재미있는 사이트네요! 흥미로운 작품들이 많아요.",
            "Broken Grid 레이아웃 정말 신선해요. 최고!",
            "다크모드도 깔끔하고 좋아요."
        ];
        initialEntries.forEach(entry => addGuestbookEntryToDOM(entry));
        // Initialize thumbnails after all initial entries are added
        window.initializeThumbnails('guestbook-grid', true); // Enable dragging for guestbook entries
    }

    // Call initial load
    loadGuestbookEntries();
});