import * as A from '../actions'

const initialState = {
  // any app properties received from clutter backend
  appProperties: {},
  // posts with 'stamp' as their key
  posts: {},
  handles: {
    // userHash: handle
  },
  follows: {
    // userHash: true
  },
  // active users handle
  handle: '',
  // active users userHash
  me: ''
}

export default function clutterApp (state = initialState, action) {
  const { type, meta, payload } = action
  console.log(type)
  switch (type) {
    case A.GET_HANDLE:
      return {
        ...state,
        handles: {
          ...state.handles,
          [meta.data]: payload
        },
        handle: meta.isMe ? payload : state.handle
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
      const newFollows = payload.result.reduce((memo, userHash) => {
        return {
          ...memo,
          [userHash]: true
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
      return {
        ...state,
        appProperties: {
          ...state.appProperties,
          [meta.data]: payload
        },
        me: meta.data === 'App_Key_Hash' ? payload : ''
      }
    case A.POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [meta.data.stamp]: {
            ...meta.data,
            author: state.me,
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
        posts: {
          ...state.posts,
          ...newPosts
        }
      }
    case A.GET_AGENT:
      return state
    case A.NEW_HANDLE:
      return {
        ...state,
        handles: {
          ...state.handles,
          [state.me]: meta.data
        },
        handle: meta.data
      }
    case A.UNFOLLOW:
      const copy = {...state}
      const copyOfFollows = {...state.follows}
      delete copyOfFollows[meta.data]
      copy.follows = copyOfFollows
      return copy
    default:
      return state
  }
}
