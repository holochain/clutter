Copying chain to: /Users/philipbeadle/.holochaindev
Holochain dev service initialized:
    /tmp/hcdev_scenario_test_nodes_philipbeadle/art directory created
    defaults stored to system.conf
    key-pair generated
    using art@Philips-MBP.lan as default agent identity (stored to agent.txt)
Copying chain to: /tmp/hcdev_scenario_test_nodes_philipbeadle/art
Holochain dev service initialized:
    /tmp/hcdev_scenario_test_nodes_philipbeadle/lucy directory created
    defaults stored to system.conf
    key-pair generated
    using lucy@Philips-MBP.lan as default agent identity (stored to agent.txt)
Copying chain to: /tmp/hcdev_scenario_test_nodes_philipbeadle/lucy
Holochain dev service initialized:
    /tmp/hcdev_scenario_test_nodes_philipbeadle/phil directory created
    defaults stored to system.conf
    key-pair generated
    using phil@Philips-MBP.lan as default agent identity (stored to agent.txt)
Copying chain to: /tmp/hcdev_scenario_test_nodes_philipbeadle/phil
lucy: Test 'lucy.0' t+2000ms: Lucy creates a new handle the first time she uses Clutter
lucy: <mermaid>lucy@Philips-MBP.lan-->>DHT:Check to see if lucy@Philips-MBP.lan has any exisitng handles</mermaid>
lucy: <mermaid>DHT->>lucy@Philips-MBP.lan:returns any handles</mermaid>
phil: Test 'phil.0' t+6000ms: Phil sets up a new handle 'Archer' the first time he uses Clutter
phil: <mermaid>phil@Philips-MBP.lan-->>DHT:Check to see if phil@Philips-MBP.lan has any exisitng handles</mermaid>
phil: <mermaid>DHT->>phil@Philips-MBP.lan:returns any handles</mermaid>
phil: <mermaid>phil@Philips-MBP.lan-->>DHT:Check to see if Archer exists</mermaid>
phil: <mermaid>DHT-->>phil@Philips-MBP.lan:Archer does not exist</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Check to see if Archer is already taken</mermaid>
phil: <mermaid>phil@Philips-MBP.lan-->>DHT:Check to see if handle has been setup</mermaid>
phil: <mermaid>phil@Philips-MBP.lan-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>phil@Philips-MBP.lan:commit Root of all anchors to local chain</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Publish Root of all anchors</mermaid>
phil: <mermaid>DHT-->>phil@Philips-MBP.lan:Return the Root Anchor Type</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>phil@Philips-MBP.lan:commit handle to local chain</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Publish handle</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Link handle to Root of all anchors</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>phil@Philips-MBP.lan:commit Archer has been setup</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Publish Archer</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Link Archer to handle</mermaid>
phil: <mermaid>DHT-->>phil@Philips-MBP.lan:Return the anchor for Archer</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>phil@Philips-MBP.lan:commit new handle</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Publish Archer</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Link Archer to "handle_links"</mermaid>
phil: <mermaid>phil@Philips-MBP.lan->>DHT:Link Archer to "directory_links"</mermaid>
phil: passed! ✔
art: Test 'art.0' t+8001ms: Art tries to use handle 'Archer' which is already taken by Phil
art: <mermaid>art@Philips-MBP.lan-->>DHT:Check to see if art@Philips-MBP.lan has any exisitng handles</mermaid>
art: <mermaid>DHT->>art@Philips-MBP.lan:returns any handles</mermaid>
art: <mermaid>art@Philips-MBP.lan-->>DHT:Check to see if Archer exists</mermaid>
art: <mermaid>DHT-->>art@Philips-MBP.lan:Archer exists</mermaid>
art: passed! ✔
lucy: <mermaid>lucy@Philips-MBP.lan-->>DHT:Check to see if Lucy exists</mermaid>
lucy: <mermaid>DHT-->>lucy@Philips-MBP.lan:Lucy does not exist</mermaid>
DHT Query with no peers in routing table!
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Check to see if Lucy is already taken</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan-->>DHT:Check to see if handle has been setup</mermaid>
lucy: <mermaid>DHT-->>lucy@Philips-MBP.lan:Return the anchorType handle</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>lucy@Philips-MBP.lan:commit Lucy has been setup</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Publish Lucy</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Link Lucy to handle</mermaid>
lucy: <mermaid>DHT-->>lucy@Philips-MBP.lan:Return the anchor for Lucy</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>lucy@Philips-MBP.lan:commit new handle</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Publish Lucy</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Link Lucy to "handle_links"</mermaid>
lucy: <mermaid>lucy@Philips-MBP.lan->>DHT:Link Lucy to "directory_links"</mermaid>
lucy: passed! ✔
