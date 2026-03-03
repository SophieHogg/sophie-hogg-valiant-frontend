# Notes

This file contains more detailed notes on the process (partially as a log for myself to remember and partially as a more thorough way to track progress).

### Notes on AI

I'm using GPT 4.1 at the moment for assistance as it's included in my personal plan. I would generally use Claude Sonnet 4.6 for most tasks as I find it more reliable.

The autocomplete was generally helpful but it still struggles with specific tasks such as detailed error handling.

### Get it running on local machine

Getting it running was initially an issue due to Mac reserving the 5000 port. 
Catalogued on [Reddit](https://www.reddit.com/r/perl/comments/10p8p39/macos_port_5000_mystery_solved/) and [Apple Stack Exchange](https://apple.stackexchange.com/questions/431154/should-controlcenter-app-listen-to-port-5000-tcp-on-a-normal-macos-monterey-syst).

I swapped to 5001 port to fix this temporarily.

### Flesh out folder structure (services, stores, components)

Tests will sit alongside the relevant section, not split out into their own mirrored section - easier to find them

Edit: later, having checked out the repo more thoroughly, there's an explicit test folder, so I'll move the tests in there. 

### Create link to the backend to fetch relevant data

I have added a service.js file inside the /services/ folder to keep all my backend calls, plus my port number and baseUrl.

I'm just using basic fetch functions here due to the size and scope of the project. This would ideally be replaced with Axios if we were making more complex calls (e.g. POST, PUT, DELETE) or in a larger project.

Copilot has pieced together some error handling for me, which is a good thing to keep in mind. 

```
catch (err) {
    console.error('Failed to fetch loan purposes', err)
    return []
  }
```

However, the error handling lacks some flair - I want to know when the data returns as empty because there's no data vs when the data returns as empty because it's an error.
I'd also want to actually tell the user, not just log it in the console.
I'll have to adjust this later.

### Create simple form

Step 3 and 4 are interchangeable, so this may change later

First step was to create some reusable components:

- A select
- A currency input

And add the relevant tests.

For the currency input, I would usually use either a component library or a `type=number` to do the validation for me. However, given the spec states it must be a `type=text`, I've added validation on keypress.

For the dropdown, all input objects have a unique value so we can keep that inside the component and emit the entire object. 
If this were a full component library and needed to be easily extensible, I'd pass just an option list of labels in type string[] and find the output on emit to keep the component small and easily used across all object shapes.

### Ensure outputs are returning as necessary (testing)

### Add styling and design

This took a little while to figure out. I'm used to making a lot of standard forms (i.e. with labels and a standard grid-esque layout) so this one took some work to figure out how to make the inputs not look as awkward inline with the text.

I'd usually reference existing designs for this but most of the forms on Valiant's website use select cards over select dropdowns (which was an explicit part of the spec).

Adding some of Valiant's colours (for text, background and highlights) was useful and I fleshed out the Tailwind config with these custom variables.

### Add special details (tooltips, etc.)

Format currency on blur
I always find it a lot easier to read a number (especially a large one) if it's formatted (with proper commas). But formatting as the user types can be jarring and if it's handled improperly can swallow inputs.


### Throughout:

* Test with Vitest
    * writing tests at the end is laborious and it's easier to write tests with full context of the component
    * TBD whether to write tests before (TDD) or after each component

