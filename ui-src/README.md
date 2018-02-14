## Clutter rewritten in Redux/React

This app was bootstrapped using `create-react-app`. Run `$ npm install` to install dependencies, and then `$ npm start` to boot up the server. 
You should also be running `$ hcdev web` for the holochain app. 
It is set up to proxy from port 3000 which this runs on to port 4141 which is default for holochain

For this app, I [(Connoropolous)](https://github.com/Connoropolous) setup a piece of middleware for Redux, optimized for making holochain requests. It's called [hc-redux-middleware](https://github.com/Holochain/hc-redux-middleware).

Here's how it works:

For a given backend function that you want to call, such as `getFollow`, you first define a constant within `src/actions/index.js`.

```
export const GET_FOLLOW = 'getFollow'
```
This is exported so that we can later, and easily, access it within our Redux reducers.

You then define a function which acts as a Redux "action creator", and give it special properties so that the custom
Holochain Redux middleware will send the right HTTP request.

```
export function getFollow(userHash, type, then) {
  return {
    type: GET_FOLLOW,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: {
        from: userHash,
        type: type
      },
      then
    }
  }
}
```

- Make the function accept any data that you need to send to the API.
- Make the last parameter a variable called `then` which represents a callback function, which will be passed the final value of your API request as well. This uses the promise chains pattern.
- Make the `type` equal to the constant you defined, like `GET_FOLLOW`.
- Under `meta`, you must set `isHc` to `true`. This tells the middleware this is a HC request.
- Under `meta` you must set a `namespace`, which must be the name of your running Holochain app, such as `clutter`. It will be used in the URL the request is sent to.
- Under `meta`, set `data` to whatever your input parameters for the function were, such as `userHash` and `type`, in the format that the HC app defines. It can be a simple string, like `data: "test"`, or an object like in the example. The middleware will stringify the data to send it to ther server if it's an object.
- Under `meta`, set the key `then` equal to the value of the `then` parameter that was passed. It doesn't matter if `then` is undefined. This is like the `callback` that you can call when the async request completes.

For a given component, like `App` where you want to enable a server request, create a container component, which we use Redux to `connect` it.

```
import { connect } from 'react-redux'
import App from './App'
import {
  ...
  getFollow
  ...
} from './actions'
...
const mapDispatchToProps = (dispatch) => {
  return {
    ...
    getFollow: (userHash, type, then) => {
      dispatch(getFollow(userHash, type, then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
```

What this does is define a `prop` called `getFollow` for App, which will actually dispatch the `getFollow` request.
Now within `App.js` I can just call

```
  this.props.getFollow(this.props.me, "following")
```

In this case, I don't provide a callback function.

Now the middleware kicks in. What it does under the hood:
- It checks whether your action is an HC action: `if (!(meta && meta.isHc))`
- Uses axios to send a network request with your data

```
const stringified = typeof data === "object" ? JSON.stringify(data) : data
return axios.post(`/fn/${namespace}/${fnName}`, stringified)
...
```

- `fnName` is based on your action `type` constant that you defined so make sure that that matches the HC app function name

Now, since this performs an async network request, your action will not fire right away! But if you want something to HAPPEN right away, to offer the user feedback on a button click for example, there is another piece of middleware that helps with this. The `requestSendingMiddleware`. It will dispatch an action that looks something like `getFollowSent`.
You can use this to make some change to `state` to show a `pending` status. It will have the same values in the `meta` of that action as the original action.

Our middleware is combined with `redux-promises` to complete the final step, dispatching the original action once the request completes, with the server response set under `payload` on the action.

You can see how this is set up in `src/index.js`

```
const middleware = compact([
  hcMiddleware,
  requestSendingMiddleware,
  promiseMiddleware
])
let store = createStore(clutterApp, undefined, compose(applyMiddleware(...middleware)))
```

Now we can access our API values in our reducers, and use them to modify state. e.g.

```
  // meta.data is the userHash, action.payload is the handle we retrieved for them
  case A.GET_HANDLE:
    return Object.assign(
      {},
      state,
      {
        handles: Object.assign({}, state.handles, { [meta.data]: action.payload })
      }
    )
```

Once we have set these values in state, we can access them using `mapStateToProps` in container components that we `connect`. e.g.

```
const mapStateToProps = state => {
  return {
    handles: state.handles
  }
}
```

Now we can access data from our HC backend in our component, in its props.

```
this.props.handles[post.author]
```

This is just a rough overview, just hopefully gives enough of an idea to get started. You will definitely need basic familiarity with redux to use this. They have excellent documentation, check it out.
[https://redux.js.org](https://redux.js.org)









