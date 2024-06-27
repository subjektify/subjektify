---
to: <%= outputDirectory %>/<%= model.name %>Client.ts
---

export class <%= model.name %>Client {
    constructor(private apiUrl: string) {}

    // Define state retrieval methods
    <% model.states.forEach(state => { %>
    async get<%= state.name.charAt(0).toUpperCase() + state.name.slice(1) %>(): Promise<<%= state.type %>> {
        const response = await fetch(`${this.apiUrl}/<%= state.name %>`);
        return await response.json();
    }
    <% }) %>

    // Define behavior methods
    <% model.behaviors.forEach(behavior => { %>
    async <%= behavior.name %>(<%= behavior.params.map(param => param.name + ': ' + param.type).join(', ') %>): Promise<void> {
        const response = await fetch(`${this.apiUrl}/<%= behavior.name %>`, {
            method: 'POST',
            body: JSON.stringify({ <%= behavior.params.map(param => param.name).join(', ') %> }),
        });
        if (!response.ok) {
            throw new Error('Failed to execute <%= behavior.name %>');
        }
    }
    <% }) %>
}
