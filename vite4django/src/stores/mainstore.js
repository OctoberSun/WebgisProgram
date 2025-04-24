/* jshint esversion: 11 */
// oneproject / 2024-04-25 / 18:01:00
//console.log('mainstore.js');
import {defineStore} from 'pinia';

const id = 'mainstore';

const state = {
    storeid: 'mainstore',
    storename: "MAINSTORE",
    debug: true,
    viewer: undefined,
    longitude: undefined,
    lattitude: undefined,
    altitude: undefined,
    argometaInformation: undefined,
    argoheaderInformation: undefined,
    loadedLayers:[],
    count: 0,
};

const actions = {
    increment() {
        this.count++;
    }
};

const option = {
    id: id,
    state: () => (state),
    actions: actions
};

const useMainStore = defineStore(option);
export {useMainStore};