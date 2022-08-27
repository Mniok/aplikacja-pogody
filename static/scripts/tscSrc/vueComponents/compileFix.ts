class Vue {
    static createApp: any;
}
//workaround because tsc compiler throws errors
//because Vue is imported in home.html
//so the compiler cannot detect it,
//and the things I tried didn't work.
//this stops the compiler from aborting compilation, and does nothing else.
//the real Vue.createapp is imported in home.html and works as intended.