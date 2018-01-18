import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Follow from './Follow'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Follow', module)
  .add('Following 2 people', () => {
    const following = [
      {'handle': 'philt3r', 'userHash': 'wegwtrwrt'},
      {'handle': 'Test 2', 'userHash': 'dddd'}
    ]
    const notFollowing = []
    specs(() => describe('The Follow Form with followed entities', function () {
      it('You can see the list of entities you are following, if you are following any.', () => {
        const mockFollowing = [
          {'handle': 'philt3r', 'userHash': 'wegwtrwrt'},
          {'handle': 'Test 2', 'userHash': 'dddd'}
        ]
        const wrapper = mount(<Follow following={mockFollowing} notFollowing={[]} />)
        expect(wrapper.find('#following li').length).toEqual(2)
      })
      it('Triggers unfollow with the userHash when Unfollow button is clicked', () => {
        const mockFollowing = [
          {'handle': 'philt3r', 'userHash': 'wegwtrwrt'}
        ]
        let triggered = false
        const wrapper = mount(<Follow following={mockFollowing} notFollowing={[]} unfollow={(userHash) => triggered = userHash} />)
        wrapper.find('.following-handle button').simulate('click')
        expect(triggered).toEqual('wegwtrwrt')
      })
    }))

    return getFollow(following, notFollowing)
  })
  .add('Following none', () => {
    const following = []
    const notFollowing = [
      {'handle': 'philt3r', 'userHash': 'wegwtrwrt'},
      {'handle': 'Test 2', 'userHash': 'dddd'}
    ]
    specs(() => describe('The Follow Form with only unfollowed entities', function () {
      it('Updates the text in the user input search handles box', () => {
        const mockFollowing = []
        const notFollowing = []
        const wrapper = mount(<Follow following={mockFollowing} notFollowing={notFollowing} />)
        wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}})
        expect(wrapper.find('#followHandle').getElement().props.value).toEqual('Follow this')
      })
      it('Filters the list according to the handle input by string matching', () => {
        const mockFollowing = []
        const notFollowing = [
          {'handle': 'philt3r', 'userHash': 'wegwtrwrt'},
          {'handle': 'Test 2', 'userHash': 'dddd'}
        ]
        const wrapper = mount(<Follow following={mockFollowing} notFollowing={notFollowing} />)
        expect(wrapper.find('#not-following li').length).toEqual(2)
        wrapper.find('#followHandle').simulate('change', {target: {value: 'weg'}})
        expect(wrapper.find('#not-following li').length).toEqual(1)
      })
      it('Triggers follow with the userHash when the Follow button is clicked', () => {
        const mockFollowing = []
        const notFollowing = [
          {'handle': 'philt3r', 'userHash': 'wegwtrwrt'}
        ]
        let triggered = false
        const wrapper = mount(<Follow following={mockFollowing} notFollowing={notFollowing} follow={(userHash) => triggered = userHash} />)
        wrapper.find('.following-handle button').simulate('click')
        expect(triggered).toEqual('wegwtrwrt')
      })
    }))

    return getFollow(following, notFollowing)
  })

function getFollow (following, notFollowing) {
  return (
    <Follow following={following}
      notFollowing={notFollowing}
      follow={action('clicked Follow Button')}
      unfollow={action('clicked Unfollow Button')} />
  )
}
