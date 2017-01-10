Polymer({

    is: `about-component`,

    behaviors: [
        Polymer.Behaviors.Resource
    ],

    properties: {
        campaign: {
            type: Object
        },
        aboutList: {
            type: Array
        }
    },

    goForward: function(event) {
        var normalizedEvent = Polymer.dom(event);
        let type = normalizedEvent.localTarget.type;
        let id = normalizedEvent.localTarget.id;
        this.fire(`on-analytics-event`, { category: `about-component`, action: `click`, label: type });
        this.fire(`on-about`, {
            about: { type: type, id: id }
        });
        this.fire(`on-notify-event`, { affirmation: this.localize(`notification.about-type`, `type`, type)});
    }
});