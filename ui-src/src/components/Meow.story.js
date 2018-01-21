import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Meow from './Meow'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Meow', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('With 2 meows', () => {
    const post = {'message': 'Eric', 'author': 'author', 'stamp': 1516273525437}
    return getMeow(post)  
  })

function getMeow (post) {
  return (
    <Meow getPost={action('clicked')} post={post} />
  )
}
