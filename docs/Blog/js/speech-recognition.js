const SpeechRecognizer = (function () {
    let recognition;
    let timeoutId;
    let timerInterval;
    let remainingTime;
    let fullTranscript = '';
    let eventListeners = {};

    let onTranscript
    function startRecognition(duration = 10000) { // Default duration: 10 seconds
        if (recognition) {
            recognition.abort(); // Stop any ongoing recognition
        }

        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.continuous = true; // Keep listening even if the speaker pauses
        recognition.interimResults = false;
        recognition.onresult = function (event) {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    fullTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            //for (var i = event.resultIndex; i < event.results.length; i++) {
            //    if (event.results[i].isFinal) {
            //        const transcript = event.results[i][0].transcript;
            //        emitEvent('transcript', transcript);
            //    }
            //}
        };

        recognition.onstart = function (event) {
            console.log("Recognition started");
            remainingTime = Math.ceil(duration / 1000);
            updateTimerDisplay();

            // Set a timeout to stop recognition after the specified duration
            timeoutId = setTimeout(() => {
                recognition.stop();
            }, duration);

            // Start the timer interval
            timerInterval = setInterval(updateTimerDisplay, 1000);
            emitEvent('start');
        };

        recognition.onerror = function (event) {
            console.log("Error occurred in recognition: " + event.error);
            stopTimer();
            emitEvent('error', event.error);
        };

        recognition.onend = function (event) {
            if (remainingTime > 0) {
                recognition.start();
            } else {
                console.log("Recognition ended");
                clearTimeout(timeoutId);
                stopTimer();
                emitEvent('end', fullTranscript);
                fullTranscript = '';
            }

            //console.log("Recognition ended");
            //stopTimer();
            //emitEvent('end');
        };

        // Start recognition
        recognition.start();
    }

    function stopRecognition() {
        if (recognition) {
            recognition.stop();
            clearTimeout(timeoutId);
            stopTimer();
        }
    }

    function updateTimerDisplay() {
        if (remainingTime > 0) {
            emitEvent('timerUpdate', remainingTime);
            remainingTime--;
        } else {
            stopTimer();
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
        //emitEvent('timerStop', remainingTime);

    }

    function on(eventName, callback) {
        if (!eventListeners[eventName]) {
            eventListeners[eventName] = [];
        }
        eventListeners[eventName].push(callback);
    }

    function off(eventName, callback) {
        if (eventListeners[eventName]) {
            eventListeners[eventName] = eventListeners[eventName].filter(cb => cb !== callback);
        }
    }

    function emitEvent(eventName, data) {
        if (eventListeners[eventName]) {
            eventListeners[eventName].forEach(callback => callback(data));
        }
    }

    // Public API
    return {
        start: startRecognition,
        stop: stopRecognition,
        on: on,
        off: off
    };
});