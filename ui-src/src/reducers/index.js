import * as A from '../actions'

const initialState = {
  // any app properties received from clutter backend
  appProperties: {},
  // posts with 'stamp' as their key
  posts: {},
  modalIsOpen: true,
  handles: {
    // userHash: handle
  },
  handleTaken: false,
  follows: {
    // userHash: true
  },
  // active users handle
  handle: '',
  // active users name
  firstName: '',
  // array of hash posts user has favourited
  favourites: [],
  // active users profile name
  profilePic: '',
  // active users userHash
  me: ''
}

export default function clutterApp(state = initialState, action) {
  const { type, meta, payload } = action
  // console.log('reducer type ' + type)
  switch (type) {
    case A.RESET_STATE:
      return initialState
    case A.ADD_FAVOURITE:
      return {
        ...state,
        favourites: payload
      }
    case A.GET_FAVOURITES:
      return {
        ...state,
        favourites: payload
      }
    case A.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: payload
      }
    case A.SET_FIRST_NAME:
      return {
        ...state,
        firstName: payload
      }
    case A.SET_PROFILE_PIC:
      return {
        ...state,
        profilePic: payload
      }
    case A.GET_PROFILE_PIC:
      return {
        ...state,
        profilePic: payload
      }
    case A.GET_FIRST_NAME:
      return {
        ...state,
        firstName: payload
      }
    case A.TOGGLE_MODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen
      }
    case A.GET_HANDLE:
      return {
        ...state,
        handles: {
          ...state.handles,
          [meta.data]: payload
        },
        handle: payload
      }
    case A.GET_HANDLES:
      return {
        ...state,
        handles: payload
      }
    case A.GET_POST:
      if (!payload) {
        return state
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [payload.stamp]: payload
        }
      }
    case A.GET_FOLLOW:
      // console.log('follows reducer ' + JSON.stringify(payload))
      const newFollows = payload.reduce((memo, handleHash) => {
        return {
          ...memo,
          [handleHash]: true
        }
      }, {})
      return {
        ...state,
        follows: {
          ...state.follows,
          ...newFollows
        }
      }
    case A.APP_PROPERTY:
      //console.log("APP_PROPERTY" + meta.data + "payload " + payload);
      return {
        ...state,
        appProperties: {
          ...state.appProperties,
          [meta.data]: payload
        },
        handle: payload
      }
    case A.POST:
      return {
        ...state,
        favourites: state.favourites,
        posts: {
          ...state.posts,
          [meta.data.stamp]: {
            ...meta.data,
            author: state.handle,
            hash: payload
          }
        }
      }
    case A.POST_MOD:
      // TODO
      return state
    case A.FOLLOW:
      return {
        ...state,
        follows: {
          ...state.follows,
          [meta.data]: true
        }
      }
    case A.GET_POSTS_BY:
      console.log('GET_POSTS_BY ' + JSON.stringify(payload))
      console.log(state)
      const newPosts = payload.reduce((memo, item) => {
        return {
          ...memo,
          [item.post.stamp]: {
            ...item.post,
            author: item.author,
            hash: item.H
          }
        }
      }, {})
      return {
        ...state,
        favourites: state.favourites,
        posts: {
          ...state.posts,
          ...newPosts
        }
      }
    case A.GET_POSTS_HASHTAG:
      console.log('GET_POSTS_HASHTAG ' + JSON.stringify(payload))
      const newPostsHashtag = payload.reduce((memo, item) => {
        return {
          ...memo,
          [item.post.stamp]: {
            ...item.post,
            author: item.author,
            message: item.post.message,
            hash: item.H
          }
        }
      }, {})
      return {
        ...state,
        posts: {
          ...state.posts,
          ...newPostsHashtag
        }
      }
    case A.GET_AGENT:
      return state
    case A.USE_HANDLE:
      //console.log("HandleInUse" + payload);
      if (payload === 'HandleInUse') {
        return {
          ...state,
          handleTaken: true
        }
      } else {
        return {
          ...state,
          handles: {
            ...state.handles,
            [state.me]: meta.data
          },
          handle: meta.data,
          handleTaken: false
        }
      }
    case A.UNFOLLOW:
      const copy = { ...state }
      const copyOfFollows = { ...state.follows }
      delete copyOfFollows[meta.data]
      copy.follows = copyOfFollows
      return copy
    default:
      return state
  }
}
