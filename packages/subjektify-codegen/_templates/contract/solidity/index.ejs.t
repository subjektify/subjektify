---
to: <%= outputDirectory %>/<%= model.name %>.sol
---

pragma solidity ^0.8.0;

contract <%= model.name %> {
    // Define state variables
    <% model.states.forEach(state => { %>
    <%= state.type %> public <%= state.name %>;
    <% }) %>

    // Define behaviors
    <% model.behaviors.forEach(behavior => { %>
    function <%= behavior.name %>(<%= behavior.params.map(param => param.type + ' ' + param.name).join(', ') %>) public {
        // Add behavior implementation here
    }
    <% }) %>
}
