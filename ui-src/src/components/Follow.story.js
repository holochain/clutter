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
  .add('With 2 followers', () => {
    const following = [
      {'handle': '@philt3r', 'userHash': 'wegwtrwrt'},
      {'handle': 'Test 2', 'userHash': 'dddd'}
    ]
    specs(() => describe('The Follow Form with followed entities', function () {
      it('You can see the list of entities you are following, if you are following any.', () => {
        const mockFollowing = [
          {'handle': '@philt3r', 'userHash': 'wegwtrwrt'},
          {'handle': 'Test 2', 'userHash': 'dddd'}
        ]
        const wrapper = mount(<Follow following={mockFollowing} />)
        expect(wrapper.find('li').length).toEqual(2)
      })
      it('When you submit the form with a known entity the text input box will be cleared and the new entity gets added to the list', () => {
        let mockFollowing = []
        const wrapper = mount(<Follow following={mockFollowing} follow={() => mockFollowing.push({'handle': 'new', 'userHash': 'wegwtrwrt'})} />)
        wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}})
        wrapper.find('form').simulate('submit', { preventDefault () {} })
        expect(wrapper.find('#followHandle').getElement().props.value).toEqual('')
        expect(wrapper.find('li').length).toEqual(1)
      })
      it('When you submit the form with a unknown entity the text input box will be cleared and the list stays the same', () => {
        let mockFollowing = []
        const wrapper = mount(<Follow following={mockFollowing} follow={() => true} />)
        wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}})
        wrapper.find('form').simulate('submit', { preventDefault () {} })
        expect(wrapper.find('#followHandle').getElement().props.value).toEqual('')
        expect(wrapper.find('li').length).toEqual(0)
      })
      it('When you click the Unfollow button the entity is removed from the list of entities you are following', () => {
        const mockFollowing = [
          {'handle': '@philt3r', 'userHash': 'wegwtrwrt'},
          {'handle': 'Test 2', 'userHash': 'dddd'}
        ]
        const wrapper = mount(<Follow following={mockFollowing} unfollow={() => mockFollowing.splice(0, 1)} />)
        wrapper.find('li').first().find('button').simulate('click', {target: {value: 'dddd'}})
        expect(wrapper.find('li').length).toEqual(1)
      })
    }))

    return getFollow(following)
  })
  .add('No followers', () => {
    const following = []
    specs(() => describe('The Follow Form with no followed entities', function () {
      it('Type in the handle of the entity you want to follow', () => {
        const mockFollowing = []
        const wrapper = mount(<Follow following={mockFollowing} />)
        wrapper.find('#followHandle').simulate('change', {target: {value: 'Follow this'}})
        expect(wrapper.find('#followHandle').getElement().props.value).toEqual('Follow this')
      })
      // it('If you submit the form empty nothing happens :)', () => {
      //   let mockFollowing = []
      //   const wrapper = mount(<Follow following={mockFollowing} follow={() => true} />)
      //   const onHandleFollow = spyOn(wrapper.instance(), 'follow')
      //   wrapper.find('form').simulate('submit', { preventDefault () {} })
      //   expect(onHandleFollow).not.toHaveBeenCalled()
      // })
    }))

    return getFollow(following)
  })
  .add('Handle not found', () => {
    const following = []
    const handleNotFound = 'Timothy'
    specs(() => describe('The Follow Form with an unfound user handle', function () {
      it('Displays a message to the user that includes the handle they searched for', () => {
        const handleNotFound = 'Timothy'
        const wrapper = mount(<Follow following={[]} handleNotFound={handleNotFound} />)
        expect(wrapper.find('.handleNotFound').text()).toEqual("Could not find 'Timothy'")
      })
    }))
    return getFollow(following, handleNotFound)
  })

function getFollow (following, handleNotFound) {
  return (
    <Follow following={following}
      handleNotFound={handleNotFound || ''}
      follow={action('clicked Follow Button')}
      unfollow={action('clicked Unfollow Button')} />
  )
}
