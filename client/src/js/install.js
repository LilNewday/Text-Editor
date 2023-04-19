const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Sets window.deferredPrompt property to the event
    window.deferredPrompt = event;

    // Makes the butInstall button visible to the user
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // gets the deferredPrompt property from the window
    const promptEvent = window.deferredPrompt;
    // If the promptEvent is null or undefined, return and do nothing
    if (!promptEvent) {
        return;
    }
    // Shows app installation prompt to the user
    promptEvent.prompt();
    // prompt is cleared
    window.deferredPrompt = null;
    // Hides the butINstall button when the user clicks it
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // prompt is no longer visible after the user has installed the PWA.
    window.deferredPrompt = null;
});
