import React from 'react'
import { Provider } from 'react-redux'
const path = require('path')
const chai = require('chai')
const { Pact } = require('@pact-foundation/pact')
const chaiAsPromised = require('chai-as-promised')
import SettingsContainer from './SettingsContainer'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CreateStore from './store'

const expect = chai.expect
const MOCK_SERVER_PORT = 4141

chai.use(chaiAsPromised);
configure({ adapter: new Adapter() })


let store = CreateStore()

describe('Pact', () => {

  // (1) Create the Pact object to represent your provider
  const provider = new Pact({
    consumer: 'Settings',
    provider: 'Clutter',
    port: MOCK_SERVER_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
    spec: 2
  })

  // this is the response you expect from your Provider
  const EXPECTED_BODY = 'QmbqHQucV1A67QvAb16hxmQC1BAKArrffhrV7ta1koku5P'

    describe('Setting and updating the person\'s handle', () => {
      beforeAll((done) => {
        // (2) Start the mock server
        provider.setup()
          // (3) add interactions to the Mock Server, as many as required
          .then(() => {
            return provider.addInteraction({
              // The 'state' field specifies a "Provider State"
              state: 'There is no user handle set',
              uponReceiving: 'A request to set a new handle',
              withRequest: {
                method: 'POST',
                path: 'fn/clutter/newHandle',
                body: 'testUserName',
                headers: { 'Accept': 'application/json' }
              },
              willRespondWith: {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: EXPECTED_BODY
              }
            })
          })
          .then(() => done())
      })

      // (4) write your test(s)
      it('Setting the handle to "Phil" will update the redux store "handle" to "Phil"', () => {
        const wrapper = mount(<Provider store={store}><SettingsContainer /></Provider>)
        wrapper.find('input[id="myHandle"]').simulate('change', {target: {value: 'Phil'}})
        wrapper.find('form[id="handleForm"]').simulate('submit')
        expect(wrapper.find('input[id="myHandle"]').getElement().props.value).equal('')
      })

      // (6) write the pact file for this consumer-provider pair,
      // and shutdown the associated mock server.
      // You should do this only _once_ per Provider you are testing.
      afterAll(() => {
        provider.finalize()
      })
    })
  })
