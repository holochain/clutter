// Holochain actions
export const GET_HANDLE = 'getHandle'
export const GET_HANDLES = 'getHandles'
export const GET_FOLLOW = 'getFollow'
export const APP_PROPERTY = 'appProperty'
export const POST = 'post'
export const GET_POST = 'getPost'
export const POST_MOD = 'postMod'
export const FOLLOW = 'follow'
export const GET_POSTS_BY = 'getPostsBy'
export const GET_AGENT = 'getAgent'
export const NEW_HANDLE = 'newHandle'
export const UNFOLLOW = 'unfollow'

// Holochain actions
export function getHandle (userHash, isMe = false, then) {
  return {
    type: GET_HANDLE,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: userHash,
      isMe,
      then
    }
  }
}

export function getHandles (then) {
  return {
    type: GET_HANDLES,
    meta: {
      isHc: true,
      namespace: 'clutter',
      then
    }
  }
}

export function newHandle (handle, then) {
  return {
    type: NEW_HANDLE,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: handle,
      then
    }
  }
}

export function getFollow (handle, type, then) {
  return {
    type: GET_FOLLOW,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: {
        from: handle,
        type: type
      },
      then
    }
  }
}

export function appProperty (key, then) {
  return {
    type: APP_PROPERTY,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: key,
      then
    }
  }
}

export function post (message, then) {
  return {
    type: POST,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: {
        message: message,
        stamp: new Date().valueOf()
      },
      then
    }
  }
}

export function getPost (postHash, then) {
  return {
    type: GET_POST,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: {
        postHash
      },
      then
    }
  }
}

export function postMod (hash, message, then) {
  return {
    type: POST_MOD,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: {
        hash,
        post: {
          message,
          stamp: new Date().valueOf()
        }
      },
      then
    }
  }
}

export function getPostsBy (handles, then) {
  return {
    type: GET_POSTS_BY,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: handles,
      then
    }
  }
}

export function getAgent (handle, then) {
  return {
    type: GET_AGENT,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: handle,
      then
    }
  }
}

export function follow (handle, then) {
  return {
    type: FOLLOW,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: handle,
      then
    }
  }
}

export function unfollow (userHash, then) {
  return {
    type: UNFOLLOW,
    meta: {
      isHc: true,
      namespace: 'clutter',
      data: userHash,
      then
    }
  }
}
