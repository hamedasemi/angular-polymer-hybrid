Polymer({
    is: `start-component`,

    behaviors: [
        Polymer.Behaviors.Resource
    ],

    properties: {
        campaign: {
            type: Object
        }
    },

    goForward: function() {
        this.fire(`on-analytics-event`, { category: `start-component`, action: `click`, label: `Continue` });
        this.fire(`on-start`, {});
    }
});
