import { useState, useEffect } from 'react';

// This Custom Hook handles attaching and removing Event Handlers on keypress
export function useKey(key, action) {
  // Side Effect to enable Esc keystroke for going back
  useEffect(
    function () {
      function callback(e) {
        // Call CloseMovie only if the key is Escape
        // We convert the strings to lower case to avoid comparison confusion
        // As user might pass Escape / escape etc.. hence convert the code and key both to lowercase and compare
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      // Add the Event Listener on the Document for keypress
      document.addEventListener('keydown', callback);

      // Cleanup Function
      return () => document.removeEventListener('keydown', callback);
    },

    // Re render if action / key changes as arguments for Custom Hook
    [action, key],
  );
}
