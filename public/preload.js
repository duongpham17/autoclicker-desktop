const { contextBridge } = require('electron');

const scripts = require('../scripts');

contextBridge.exposeInMainWorld('api', {
    ...scripts,
})