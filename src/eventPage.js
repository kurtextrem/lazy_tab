'use strict'

// discard all tabs at startup
chrome.runtime.onStartup.addListener(discardAllTabs)

// discard all tabs in all windows
function discardAllTabs() {
	const tabs = chrome.tabs
	chrome.windows.getAll({ populate: true }, windowsList => {
		for (let i = 0; i < windowsList.length; ++i) {
			const win = windowsList[i]
			const minimized = win.state === 'minimized'

			for (let x = 0; x < win.length; ++x) {
				const tab = win[x]
				if (tab.discarded || tab.pinned || (tab.active && !minimized)) {
					return
				}

				try {
					tabs.discard(tab.id)
				} catch (e) {}
			}
		}
	})
}

// create a browser action listener to discard all tabs
chrome.action.onClicked.addListener(discardAllTabs)
