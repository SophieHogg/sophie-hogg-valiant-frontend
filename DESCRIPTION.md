# TODO:

### Get it running on local machine

Getting it running was initially an issue due to Mac reserving the 5000 port. 
Catalogued on [Reddit](https://www.reddit.com/r/perl/comments/10p8p39/macos_port_5000_mystery_solved/) and [Apple Stack Exchange](https://apple.stackexchange.com/questions/431154/should-controlcenter-app-listen-to-port-5000-tcp-on-a-normal-macos-monterey-syst).

Swapped to 5001 port to fix this temporarily.

### Flesh out folder structure (services, stores, components)
Tests will sit alongside the relevant section, not split out into their own mirrored section - easier to find them


### Create link to the backend to fetch relevant data

### Create simple form
Step 3 and 4 are interchangeable, so this may change later

### Ensure outputs are returning as necessary (testing)

### Add styling and design

### Add special details (tooltips, etc.)

### Throughout:

* Test with Vitest
    * writing tests at the end is laborious and it's easier to write tests with full context of the component
    * TBD whether to write tests before (TDD) or after each component

