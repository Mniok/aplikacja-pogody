export {};

declare global {
    interface Window { myWidgetParam: any }
}

declare global {
    interface Window { cityData: any }
}

//allows for declaration of global window.myWidgetParam used by openweather widget generator.
//marks Vue.createApp as error when placed in main.ts or compileFix.ts so I put it here
