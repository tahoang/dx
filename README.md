dx
==

A JavaScript framework built for quick application setup  using mvc architecture.
Used in conjunction with JQuery.

==
```javascript
  dx.defineController('Test', {
    initialize: function () {
      //call base class' constructor
      TestApp.app.controller.Test.parent.initialize.apply(this, arguments);
      dx.log('Test1 constructor');
    }
  });
  dx.defineController('Test2', {
    extend: dx.app.controller.Test,
      initialize: function () {
        //call base class' constructor
        dx.app.controller.Test2.parent.initialize.apply(this, arguments);
        dx.log('test2 constructor');
      }
  });
  dx.application({
    name: 'TestApp',
    controllers: ['Test', 'Test2']
  });
