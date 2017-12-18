Currency-Cponverter Application( Angular 2):

This is an angular 2 application created to fetch international curreny rates realtime.

The application is implemented with the following features,
  
  1. This application is developed with pure redux without using any ng based redux library.
  
  2. This application has a container-component based design, viz.,
    
    Container -> container.component.ts 
      It is the base component which loads the inital currency rates and invokes redux to store the object model and its html view page runs 'n' instance of the widget-components simultaneously based on 'widgetInstance' variable in 'app.constannts.ts'.
    
    Component -> converter-widget.component.ts
      An array of these components subscribe to the redux store and initialize their view with value from the store. Each component pulls in the store state based on the unique widgetinstance id injected to them from the container and access the store array of widget model to perform CRUD operations on therir corresponding array index.
  
  3. Redux Scaffolding -

    Model -> converter-widget.model is the model for a widget which uses the app-currency.model interface to define a currency. App-state.model is the structure of the store.The reducer used this model to define the initial state of the store.
    
    Reducers -> We have used nested reducers where the container.reducer.ts nests the converter-widget.ts and invokes it to make changes to induvidual widget models. These reducers consists of pure functions which make sure to preserver the immutbility of states by assigning new objects to state.

    Actions -> These are the action which are dispatched from from components and are routed to reducers. A customer action.def.ts is defined to maintain action state integrity.

    store -> The store initialises the app state and a its uses an optional Redux Devtools plugin to provide a view on the current state of the store. An injectable app token is defined to be used for singleton DI.

  4. Service -> http.service.component.ts is injected into the component to handle http service request  to fixer.io.

  5. Directives -> The valid-currency directive is used to bind the inpput field which controls the input that is pattern regulated. And it prevents,
    1. Character entry
    2. Prevents sign (+ or -) entry.
    3. Prevents special character entry.
    4. Prevents double decimal point placement
    5. Allows only valid numbers and single decimal point.

Customizing Options:
1. To change the number of widgets dynamically, change the value of 'WIDGET_INSTANCE' variable in app.constance.ts.
2. To include and remove currencies , add and remove currencies in international 3Char currencycode in the CURRENCY_TYPES_ARRAY at app.constants.ts.

Run instructions:
1) "npm install" to load the node-module dependencies,
2) "npm run start" to build and launch the application.  

A working screenshots for different devices are attached to the root directory.