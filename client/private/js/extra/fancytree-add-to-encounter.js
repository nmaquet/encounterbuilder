"use strict";

(function ($) {

    $.ui.fancytree.registerExtension({
        name: "add-to-encounter",
        version: "1.0.0",


        /* Init */

        // Overload the `renderTitle` hook, to append a button
        nodeRenderTitle: function (ctx, title) {
            var node = ctx.node;
            // Let the base implementation render the title
            this._super(ctx, title);
            // Append a button if node is a monster or npc
            if (node.data.userMonsterId || node.data.userNpcId || node.data.type === "monster" || node.data.type === "npc" || node.data.resourceType === "user-item" || node.data.type === "item") {
                $("span.fancytree-title", node.span).append($('<button class="add-item-btn pull-right"><i class="icon icon-plus">+</i></button>'));
            }
        }
    });
}(jQuery));