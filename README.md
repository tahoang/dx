dx
==
A JavaScript framework built for quick application setup  using mvc architecture. Used in conjunction with JQuery.

####Example
```javascript
  //define a new controller extends from base controller
    dx.defineController('Test', {
      initialize: function () {
        //call base class' constructor
        TestApp.app.controller.Test.parent.initialize.apply(this, arguments);
        dx.log('Test1 constructor');
      }
    });
    //controller Test2 extends Test
    dx.defineController('Test2', {
      extend: TestApp.app.controller.Test,
      initialize: function () {
        //call base class' constructor
        TestApp.app.controller.Test2.parent.initialize.apply(this, arguments);
        dx.log('test2 constructor');
      }
    });
    dx.application({
      name: 'TestApp',
      controllers: ['Test', 'Test2']
    });
```
		New controllers, models, and views, created by defineController(),
		defineModel(), and defineView(), are located in dx.app.controller, dx.app.model,
		and dx.app.view namespaces. Same goes with store (defined by defineStore()), they 
		can be found in dx.data.store namespace

		dx.app and dx.data namespaces are mapped to 'AppName'.app and 'Appname'.data namespace, where 'AppName' 
		is your application's name.
		
