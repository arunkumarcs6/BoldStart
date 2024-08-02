function makeFirstTwoBold(textNode) {
    const text = textNode.textContent;
    const words = text.split(/\s+/);
    let updatedHTML = '';

    words.forEach(word => {
        if (word.length < 2) {
            updatedHTML += word + ' ';
        } else {
            updatedHTML += `<span style="font-weight:bold;">${word.slice(0, 2)}</span>${word.slice(2)} `;
        }
    });

    // Create a temporary container for the updated content
    const tempSpan = document.createElement('span');
    tempSpan.innerHTML = updatedHTML.trim();
    
    // Insert the newly created content before the original text node
    textNode.parentNode.insertBefore(tempSpan, textNode);
    // Remove the original text node
    textNode.remove();
}

function walkTextNodes(node) {
    // Skip script, style, and input elements
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE' || node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
        return;
    }
    
    if (node.nodeType === Node.TEXT_NODE) {
        makeFirstTwoBold(node);
    } else {
        for (let child of node.childNodes) {
            walkTextNodes(child);
        }
    }
}

walkTextNodes(document.body);

