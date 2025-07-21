console.log("Email Writer Extension – Content Script Loaded");

let selectedTone = "professional"; // Default tone

function createSplitAIButton() {
    const wrapper = document.createElement('div');
    wrapper.className = 'ai-reply-wrapper';
    wrapper.style.display = 'inline-flex';
    wrapper.style.marginRight = '8px';
    wrapper.style.position = 'relative';

    /* Main Button */
    const mainBtn = document.createElement('div');
    mainBtn.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    mainBtn.textContent = 'AI Reply';
    mainBtn.style.borderRadius = '24px 0 0 24px';
    mainBtn.style.backgroundColor = '#0B57D0';
    mainBtn.style.color = '#fff';
    mainBtn.style.display = 'flex';
    mainBtn.style.alignItems = 'center';
    mainBtn.style.cursor = 'pointer';
    mainBtn.style.boxShadow = '0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)';
    mainBtn.style.transition = 'background-color 0.3s ease';

    mainBtn.addEventListener('mouseenter', () => mainBtn.style.backgroundColor = '#185abc');
    mainBtn.addEventListener('mouseleave', () => mainBtn.style.backgroundColor = '#1a73e8');

    /* Dropdown Arrow Button */
    const arrowBtn = document.createElement('div');
    arrowBtn.innerHTML = '&#9662;'; // ▼
    arrowBtn.style.borderRadius = '0 24px 24px 0';
    arrowBtn.style.padding = '0 10px 0 10px';
    arrowBtn.style.fontSize = '20px';
    arrowBtn.style.backgroundColor = '#0B57D0';
    arrowBtn.style.color = '#fff';
    arrowBtn.style.display = 'flex';
    arrowBtn.style.alignItems = 'center';
    arrowBtn.style.cursor = 'pointer';
    arrowBtn.style.borderLeft = '1px solid rgba(12, 12, 12, 0.5)';
    arrowBtn.style.transition = 'background-color 0.3s ease';

    arrowBtn.addEventListener('mouseenter', () => arrowBtn.style.backgroundColor = '#185abc');
    arrowBtn.addEventListener('mouseleave', () => arrowBtn.style.backgroundColor = '#1a73e8');

    /* Tone Dropdown Menu */
    const dropdown = document.createElement('div');
    dropdown.className = 'ai-tone-menu';
    dropdown.style.position = 'absolute';
    dropdown.style.bottom = '40px';
    dropdown.style.right = '0';
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #dadce0';
    dropdown.style.borderRadius = '6px';
    dropdown.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.51)';
    dropdown.style.padding = '4px 0';
    dropdown.style.display = 'none';
    dropdown.style.zIndex = '9999';
    dropdown.style.minWidth = '120px';

    const tones = [
        { label: 'Professional', icon: '👔' },
        { label: 'Casual', icon: '☕' },
        { label: 'Friendly', icon: '✨' },
        { label: 'None', icon: '🚫' }
    ];

    tones.forEach(tone => {
        const item = document.createElement('div');
        item.textContent = `${tone.icon} ${tone.label}`;
        item.style.padding = '8px 12px';
        item.style.cursor = 'pointer';
        item.style.fontSize = '14px';
        item.style.color = '#202124';

        item.addEventListener('mouseover', () => item.style.background = '#f1f3f4');
        item.addEventListener('mouseout', () => item.style.background = '#fff');

        item.addEventListener('click', () => {
            selectedTone = tone.label.toLowerCase();
            dropdown.style.display = 'none';
            console.log("Tone selected:", selectedTone);
        });

        dropdown.appendChild(item);
    });

    /* Toggle dropdown */
    arrowBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    /* Append */
    wrapper.appendChild(mainBtn);
    wrapper.appendChild(arrowBtn);
    wrapper.appendChild(dropdown);

    /* On Main Click: Generate reply */
    mainBtn.addEventListener('click', async () => {
        try {
            mainBtn.textContent = 'Generating...';
            mainBtn.style.pointerEvents = 'none';

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailContent, tone: selectedTone })
            });

            if (!response.ok) throw new Error('API Request Failed');

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            mainBtn.textContent = 'AI Reply';
            mainBtn.style.pointerEvents = 'auto';
        }
    });

    return wrapper;
}

function getEmailContent() {
    const selectors = ['.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
    for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) return el.innerText.trim();
    }
    return '';
}

function findComposeToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]', '.gU.Up'];
    for (const sel of selectors) {
        const bar = document.querySelector(sel);
        if (bar) return bar;
    }
    return null;
}

function injectControls() {
    document.querySelector('.ai-reply-wrapper')?.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    const splitBtn = createSplitAIButton();
    toolbar.insertBefore(splitBtn, toolbar.firstChild);
}

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        const added = Array.from(mutation.addedNodes);
        const hasCompose = added.some(n =>
            n.nodeType === 1 &&
            (n.matches('.aDh, .btC, [role="dialog"]') ||
             n.querySelector?.('.aDh, .btC, [role="dialog"]'))
        );
        if (hasCompose) {
            console.log("Compose window detected");
            setTimeout(injectControls, 500);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
