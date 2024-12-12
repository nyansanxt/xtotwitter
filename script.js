document.addEventListener("DOMContentLoaded", () => {
    const outputText = document.getElementById('outputText');

    outputText.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const url = event.target.getAttribute('href');
            const proceed = confirm("このリンクに移動しますか?");
            if (proceed) {
                window.open(url, '_blank');
            }
        }
    });
});

function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        processInput();
    }
}

function processInput() {
    const inputText = document.getElementById('inputText').value;
    if (inputText.startsWith('//cmd ')) {
        const command = inputText.substring(6).trim();
        executeCommand(command);
    } else {
        replaceXWithTwitter();
    }
}

function executeCommand(command) {
    if (command === 'twitter') {
        const cmdImage = document.getElementById('cmdImage');
        cmdImage.style.display = 'block';
    }
    // Add more commands here in the future
}

function replaceXWithTwitter() {
    const inputText = document.getElementById('inputText').value;
    let output = inputText
        .replace(/(SpaceX|XJAPAN|sex)/gi, (match) => match)
        .replace(/x/g, 'Twitter')
        .replace(/X/g, 'Twitter')
        .replace(/X（旧Twitter）/g, 'Twitter');

    if (/sex/i.test(output)) {
        output = 'エラーが発生しました';
    }

    output = output.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');

    document.getElementById('outputText').innerHTML = output;
    document.getElementById('copyButton').style.display = 'inline-block';
    document.getElementById('tweetButton').style.display = 'inline-block';
    document.getElementById('blueskyButton').style.display = 'inline-block';
    document.getElementById('threadsButton').style.display = 'inline-block';
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText').innerText;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('コピーしました');
    });
}

function tweetText() {
    const text = encodeURIComponent(document.getElementById('outputText').innerText);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function postToBluesky() {
    const text = encodeURIComponent(document.getElementById('outputText').innerText);
    window.open(`https://bsky.app/intent/compose?text=${text}`, '_blank');
}

function postToThreads() {
    const text = encodeURIComponent(document.getElementById('outputText').innerText);
    window.open(`https://www.threads.net/intent/post?text=${text}`, '_blank');
}
