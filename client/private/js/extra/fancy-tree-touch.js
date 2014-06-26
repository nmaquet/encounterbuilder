"use strict";

(function(){

    /* simulates mouse events from touch events on fancy tree drag & drop elements */
    /* based on: http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices */

    function fancyTreeTouchHandler(event) {
        var touch = event.changedTouches[0];
        if (!$(touch.target).is(".fancytree-node, .fancytree-title, .fancytree-icon")) {
            return;
        }
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[event.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);

        if (event.type === "touchmove" || event.type === "touchend") {
            /* TRICKY PART: the *target* element for MOUSEMOVE and MOUSEUP are different from TOUCHMOVE and TOUCHEND */
            /* for MOUSEMOVE and MOUSEUP the *target* is the element currently under the mouse */
            /* for TOUCHMOVE and TOUCHEND the *target is the element under the finger at the *start* of the move */
            /* to simulate mouse events properly, we must use elementFromPoint to get the target */
            document.elementFromPoint(touch.clientX, touch.clientY).dispatchEvent(simulatedEvent);
        } else {
            touch.target.dispatchEvent(simulatedEvent);
        }
        event.preventDefault();
    }

    $(document).ready(function () {
        document.addEventListener("touchstart", fancyTreeTouchHandler, true);
        document.addEventListener("touchmove", fancyTreeTouchHandler, true);
        document.addEventListener("touchend", fancyTreeTouchHandler, true);
        document.addEventListener("touchcancel", fancyTreeTouchHandler, true);
    });

})();