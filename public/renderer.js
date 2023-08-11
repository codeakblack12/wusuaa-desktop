const electron = require('electron');
// const {PosPrinter} = require('@electron/remote').require("electron-pos-printer");

let webContents = remote.getCurrentWebContents();

async function print_receipt(data){
    await window.versions.ping(data)
}