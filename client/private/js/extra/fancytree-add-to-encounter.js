"use strict";

(function ($, undefined) {







// Register a Fancytree extension
// ------------------------------
// A full blown extension, extension is available for all trees and can be
// enabled like so (see also the [live demo](http://wwwendt.de/tech/fancytree/demo/sample-ext-childcounter.html)):
//
//    <script src="../src/jquery.fancytree.js" type="text/javascript"></script>
//    <script src="../src/jquery.fancytree.childcounter.js" type="text/javascript"></script>
//    ...
//
//     $("#tree").fancytree({
//         extensions: ["childcounter"],
//         childcounter: {
//             hideExpanded: true
//         },
//         ...
//     });
//


    /* 'childcounter' extension */
    $.ui.fancytree.registerExtension({
// Every extension must be registered by a unique name.
        name: "add-to-encounter",
// Version information should be compliant with [semver](http://semver.org)
        version: "1.0.0",


        /* Init */

        // Overload the `renderTitle` hook, to append a counter badge
        nodeRenderTitle: function (ctx, title) {
            var node = ctx.node;
            // Let the base implementation render the title
            this._super(ctx, title);
            // Append a button if node is a monster or npc
            if (node.data.userMonsterId || node.data.userNpcId) {
                var type = (node.data.userMonsterId) ? "monster" : "npc";
                var id = node.data.userMonsterId || node.data.userNpcId;
                $("span.fancytree-title", node.span).append($('<button ng-click="addNpcOrMonster(' + type + ', ' + id + ')" class="add-item-btn pull-right"><i class="icon icon-plus">+</i></button>'));
            }
        }

// End of extension definition
    });
// End of namespace closure
}(jQuery));