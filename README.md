Currency-Cponverter Application:

This is an angularjs app with created to fetch realtime curreny conversion rates.
The app is has a container-component approach.
Container -> container.component.ts 
  and its html view page runs 3 instance of the widget-component running simultaneously.
Component -> converter-widget.component ts.
  and the component uses converter-widget.model.ts component to maintain state.
Model -> converter-widget.model.ts utilises Icurrency interface to maintain type safety.
Service -> http.service.component.ts is injected into the component to handle http service request to fixer.io.

Run instructions:
1) "npm install" to load the node-module dependencies,
2) "npm run build" to build the application and
2) "npm run start" to launch the application.  

A working screenshot is attached to this folder at root directory.