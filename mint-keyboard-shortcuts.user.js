// ==UserScript==
// @name Mint.com Keyboard Shortcuts
// @description Adds a few simple keyboard shortcuts to Mint.com.
// @downloadURL https://github.com/mpeter/mint-keyboard-shortcuts/raw/master/mint-keyboard-shortcuts.user.js
// @version 1.2
// @author Dave Feldman (http://operationproject.com) / Matt Peter (mpeter@gmail.com)
// @match https://mint.intuit.com/transaction.event*
// @require https://cdn.rawgit.com/madrobby/keymaster/master/keymaster.js
// ==/UserScript==

/* Licensed under the MIT License (http://opensource.org/licenses/MIT), though I'm not gonna
 * complain if you want to buy me a beer.
 */



var mintKeyboardShortcutsMain = function() {
	/**
	 * If an element with the supplied ID exist, trigger a click on it.
	 */
	var clickOn = function(elId) {
		var el = document.getElementById(elId);
		if (el) {
			el.click();
			return true;
		}
		return false;
	};
	
	/*
	 * Sets up a shortcut for a single checkbox in Mint's array of
	 * transaction tags.
	 * @param trigger - The key to bind. Standard keymaster formatting.
	 * @param title - The title of the checkbox (technically, the title attr of the label tag).
	 */
	var setTagKey = function(trigger, title) {
		key(trigger, function() {
			var labels = document.getElementById('txnEdit-tags-list').getElementsByTagName('label');
			for (var i = 0; i < labels.length; i++) {
				if (labels[i].title == title) {
					labels[i].children[0].click();
					break;
				}
			}
		});
	};

	// Open/close the transaction editor for the selected transaction.
	key('ctrl+e, e', function() {
		if (!clickOn('txnEdit-toggle')) {
			clickOn('txnEdit-cancel');
		}
	});

	// Close and save the selected transaction.
	key('ctrl+s, s', function() {
		clickOn('txnEdit-submit');
	});

	// Focus and select the category field.
	key('ctrl+c, c', function(e) {
		var el = document.getElementById('txnEdit-category_input');
		console.log(el);
		if (el) {
			el.focus();
			el.select();
		}
		e.preventDefault();
		return false;
	});

	// Toggle various transaction tags once the editor is open.
	setTagKey('s', 'Sarah');
	setTagKey('m', 'Matt');
	setTagKey('w', 'Work');
	setTagKey('o', 'OK');
};

// Now do the stuff.
mintKeyboardShortcutsMain();
