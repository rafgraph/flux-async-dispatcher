## Asynchronous app dispatcher for flux design pattern with react

- Built on top of facebook's [flux dispatcher](https://github.com/facebook/flux#installing-flux) to allow you to call dispatch while in the middle of dispatching (intended for use with react, but could be used wherever flux is deployed)


- Note that when a dispatch starts, it goes through the whole dispatch loop before it finishes:
 - Start dispatch -> store updates -> store emits change -> view callbacks update view state -> view renders -> view's children render -> view's children didUpdate -> view didUpdate -> dispatch finished  
 - If at any point during the dispatch loop you need to create a view action that calls dispatch, then you will need an asynchronous dispatcher
 - Calling dispatch while dispatching should not be done regularly, but sometimes it is unavoidable, e.g. if when a component receives specific props it needs to send a signal around the flux loop to update an unrelated component


- This asynchronous dispatcher splits actions into server actions and view actions
 - Server actions are already handled asynchronously as they are callbacks from asynchronous ajax requests and are added to the callback queue (so no need to do anything different with server actions)
 - View actions are added to the callback queue if the dispatcher is currently dispatching by calling `setTimeout(function(){ ... }, 0)`
 - Server actions and view actions are added to the callback queue on a first come first served basis
 - Once on the callback queue, the next inline dispatch action will be called when the stack is empty and it's ready to dispatch
 - There are several console logs in this async dispatcher (currently commented out) to help you understand the dispatch cycle and what is being dispatched when


- Using the object-assign operator
 - You may need to `$ npm install --save object-assign` to add object-assign to package.json
 - This async dispatcher can also be created without using the assign operator, by monkey patching the flux dispatcher, e.g. `Dispatcher.prototype.handleViewAction = function(action) { ... };`
