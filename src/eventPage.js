'use strict'

// discard all tabs at startup
chrome.runtime.onStartup.addListener(discardAllTabs)

// discard all tabs in all windows
function discardAllTabs() {
	const tabsAPI = chrome.tabs
	chrome.windows.getAll({ populate: true }, windowsList => {
		for (let i = 0; i < windowsList.length; ++i) {
			const { state, tabs } = windowsList[i]
			const minimized = state === 'minimized'

			for (let x = 0; x < tabs.length; ++x) {
				const tab = tabs[x]
				if (tab.discarded || tab.pinned || (tab.active && !minimized)) {
					continue
				}

				try {
					tabsAPI.discard(tab.id)
				} catch (e) {}
			}
		}
	})
}

// create a browser action listener to discard all tabs
chrome.action.onClicked.addListener(discardAllTabs)
