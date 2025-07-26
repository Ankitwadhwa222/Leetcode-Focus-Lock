
const notifStyle = document.createElement('style');
notifStyle.textContent = `
  #custom-notif {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #222;
    color: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    font-size: 1rem;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.4s ease, bottom 0.4s ease;
    pointer-events: none;
  }

  #custom-notif.show {
    opacity: 1;
    bottom: 40px;
    pointer-events: auto;
  }

  #cheater-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    color: red;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    z-index: 9999;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    flex-direction: column;
  }
`;
document.head.appendChild(notifStyle);


const notifDiv = document.createElement("div");
notifDiv.id = "custom-notif";
document.body.appendChild(notifDiv);


const overlay = document.createElement("div");
overlay.id = "cheater-overlay";
overlay.innerHTML = `
  🚫 You have reached your violation limit!<br>
  You are a cheater!
`;
document.body.appendChild(overlay);


const showNotification = (message, duration = 4000) => {
  notifDiv.innerHTML = message;
  notifDiv.classList.add("show");
  setTimeout(() => notifDiv.classList.remove("show"), duration);
};

(() => {

  const enterFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => {
        console.warn("Fullscreen failed:", err.message);
      });
    }
  };

  const activateFullscreenOnce = () => {
    const handleClick = () => {
      enterFullscreen();
      document.removeEventListener("click", handleClick);
    };
    document.addEventListener("click", handleClick);
  };


  const disableSolutionsTab = () => {
    const tab = document.querySelector('[data-layout-path="/ts0/tb2"]');

    if (window.location.pathname.includes("/solutions")) {
      showNotification("Access to Solutions is disabled during focus mode.");
      const basePath = window.location.pathname.split("/solutions")[0];
      window.location.href = basePath;
      return;
    }

    if (tab) {
      tab.style.pointerEvents = "none";
      tab.style.opacity = "0.1";
      tab.style.cursor = "not-allowed";
      tab.title = "Solutions are disabled to help you focus.";

      tab.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        true
      );

      const observer = new MutationObserver(() => {
        if (window.location.pathname.includes("/solutions")) {
          showNotification("Access to Solutions is blocked during focus mode.");
          const basePath = window.location.pathname.split("/solutions")[0];
          window.location.href = basePath;
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }
  };


  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      showNotification("You exited fullscreen. Please stay focused!");

      const handleClick = () => {
        enterFullscreen();
        document.removeEventListener("click", handleClick);
      };
      document.addEventListener("click", handleClick);
    }

    disableSolutionsTab();
  });


  window.addEventListener("keydown", function (e) {
    if ((e.key === 'F5') || (e.ctrlKey && e.key === 'r')) {
      e.preventDefault();
      showNotification("⛔ Refresh is disabled during exam.");
    }
  });


  let lastHiddenTime = null;
  let totalAwayTime = 0;
  let maxViolations = 3;
  let violations = 0;
  let isCheater = false;

  chrome.storage.local.get(["violations", "isCheater"], (data) => {
    violations = data.violations || 0;
    isCheater = data.isCheater || false;

    if (isCheater) {
      overlay.style.display = "flex";
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      lastHiddenTime = Date.now();
    } else if (lastHiddenTime) {
      const diff = Date.now() - lastHiddenTime;
      totalAwayTime += diff;
      violations++;

      chrome.storage.local.set({ violations });

      if (violations >= maxViolations) {
        chrome.storage.local.set({ isCheater: true });
        overlay.style.display = "flex";
        return;
      }

      showNotification(
        `⚠️ You switched tabs!<br>You were away for ${(diff / 1000).toFixed(1)} seconds.<br>` +
        `Violations: ${violations} / ${maxViolations}`
      );

      lastHiddenTime = null;
    }
  });


  window.addEventListener("load", () => {
    activateFullscreenOnce();
    disableSolutionsTab();
  });
})();
