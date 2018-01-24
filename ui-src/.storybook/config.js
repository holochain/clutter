import { configure } from '@storybook/react'
const req = require.context('../src/components', true, /story\.js$/)

function loadStories () {
  req.keys().forEach(req)
}

configure(loadStories, module)
