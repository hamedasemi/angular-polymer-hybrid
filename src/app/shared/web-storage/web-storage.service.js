/*
 * Web Storage watches for value changes and stores them in session storage,
 * local storage, or as a cookie (coming soon™).
 *
 *
 * Usage examples:
 *
 * - session storage (default):
 * <web-storage key="cows" value="{{value}}"></web-storage>
 * or
 * <web-storage type="session" key="sheep" value="{{value}}"></web-storage>
 *
 * - local storage:
 * <web-storage type="local" key="hamed" value="{{value}}"></web-storage>
 *
 * - prepend namespace:
 * <web-storage type="local" namespace="amazing" key="hamed" value="{{value}}"></web-storage>
 * */
(function () {
    const TYPE_LOCAL_STORAGE = 'local';
    const TYPE_SESSION_STORAGE = 'session';
    const TYPE_COOKIE = 'Cookie';

    let storage;

    Polymer({
        is: 'web-storage',
        properties: {
            type: {
                type: String,
                value: TYPE_SESSION_STORAGE
            },
            namespace: {
                type: String,
                value: null
            },

            key: {
                type: String,
                value: null
            },

            value: {
                type: Object,
                observer: 'valueChanged',
                notify: true
            }
        },
        ready: ready,
        valueChanged: valueChanged

    });

    function ready() {

        if (TYPE_LOCAL_STORAGE === this.type) {
            storage = window.localStorage;
        } else {
            /* Use session storage */
            storage = window.sessionStorage;
        }

        /* Initialize value */
        if (this.key !== null && storage[_getStorageKey(this)] !== undefined) {
            this.value = JSON.parse(storage[_getStorageKey(this)]);
        }
    }

    function valueChanged(value) {
        if (this.key == null) {
            console.error('Cannot store in localStorage. No key supplied for value:', value);
        } else {
            storage[_getStorageKey(this)] = (value == '') ? '' : JSON.stringify(value);
        }
    }

    function _getStorageKey(self) {
        if (self.namepsace != null) {
            return self.namespace + '.' + self.key;
        }
        return self.key;
    }
})();