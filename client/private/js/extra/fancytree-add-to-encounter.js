// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

(function ($) {
    $.ui.fancytree.registerExtension({
        name: "add-to-encounter",
        version: "1.0.0",
        nodeRenderTitle: function (ctx, title) {
            var node = ctx.node;
            this._super(ctx, title);
            if (node.data.resourceType === "user-monster" || node.data.resourceType === "user-npc" || node.data.type === "monster" || node.data.type === "npc" || node.data.resourceType === "user-item" || node.data.type === "item") {
                $(node.span).append($('<button class="add-item-btn pull-right"><i class="icon icon-plus">+</i></button>').click(function(event) {
                    if (ctx.tree.options.addToEncounter && ctx.tree.options.addToEncounter.onPlusButtonClick) {
                        event.stopPropagation();
                        ctx.tree.options.addToEncounter.onPlusButtonClick(ctx.node);
                    }
                }));
            }
        }
    });
}(jQuery));