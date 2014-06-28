"use strict";

(function () {

    /* simulates mouse events from touch events on fancy tree drag & drop elements */
    /* based on: http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices */

    /* STATE MACHINE */
    /* IDLE -> touchstart -> WAIT */
    /* WAIT -> any event -> IDLE */
    /* WAIT -> 300ms pass -> SIMULATE */
    /* SIMULATE -> touchend -> IDLE */

    function simulateMouseEvent(touchEvent) {
        var touch = touchEvent.changedTouches[0];
        var mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[touchEvent.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);
        if (touchEvent.type === "touchmove" || touchEvent.type === "touchend") {
            /* TRICKY PART: the *target* element for MOUSEMOVE and MOUSEUP are different from TOUCHMOVE and TOUCHEND */
            /* for MOUSEMOVE and MOUSEUP the *target* is the element currently under the mouse */
            /* for TOUCHMOVE and TOUCHEND the *target is the element under the finger at the *start* of the move */
            /* to simulate mouse events properly, we must use elementFromPoint to get the target */
            var htmlElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (htmlElement) {
                htmlElement.dispatchEvent(mouseEvent);
            }
        } else {
            touch.target.dispatchEvent(mouseEvent);
        }
    }

    function simulateMouseMove(touchEvent, yOffset) {
        var touch = touchEvent.changedTouches[0];
        var mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent("mousemove", true, true, window, 1,
            touch.screenX, touch.screenY, touch.clientX, touch.clientY-yOffset,
            false, false, false, false, 0, null);
        document.elementFromPoint(touch.clientX, touch.clientY+yOffset).dispatchEvent(mouseEvent);
    }

    function simulateMouseMoveAroundEvent(event) {
        var i;
        for (i = -5; i <= 0; ++i) {
            (function (j) {
                setTimeout(function () {
                    simulateMouseMove(event, j);
                }, j * 20);
            })(i);
        }
    }

    var stateMachine = {
        IDLE: {
            touchstart: function (event) {
                simulateMouseEvent(event);
                gotoState("WAIT");
                setTimeout(function () {
                    if (state === "WAIT") {
                        gotoState("SIMULATE");
                        simulateMouseMoveAroundEvent(event);
                    }
                }, 1000);
                event.preventDefault();
            },
            touchend:  function (event) {
                simulateMouseEvent(event);
                gotoState("IDLE");
            }
        },
        WAIT: {
            touchmove:  function (event) {
                gotoState("IDLE");
            },
            touchend:  function (event) {
                simulateMouseEvent(event);
                gotoState("IDLE");
            }
        },
        SIMULATE: {
            touchmove: function (event) {
                simulateMouseEvent(event);
                event.preventDefault();
            },
            touchend: function (event) {
                simulateMouseEvent(event);
                gotoState("IDLE")      ;
                event.preventDefault();
            },
            touchcancel: function (event) {
                simulateMouseEvent(event);
                gotoState("IDLE")      ;
                event.preventDefault();
            }
        }
    };

    var state = "IDLE";

    function gotoState(newState) {
        state = newState;
    }

    function fancyTreeTouchHandler(event) {
        var touch = event.changedTouches[0];
        if (!$(touch.target).is(".fancytree-node, .fancytree-title, .fancytree-icon")) {
            gotoState("IDLE");
            return;
        }
        if (stateMachine[state][event.type]) {
            stateMachine[state][event.type](event);
        }
    }

    $(document).ready(function () {
        document.addEventListener("touchstart", fancyTreeTouchHandler, true);
        document.addEventListener("touchmove", fancyTreeTouchHandler, true);
        document.addEventListener("touchend", fancyTreeTouchHandler, true);
        document.addEventListener("touchcancel", fancyTreeTouchHandler, true);
    });

})();