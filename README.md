# downshift-pelias

## What's this?

You need an autocomplete/dropdown/select experience in your application **for a Pelias geocoding service** and you want it to be accessible. You also want it to be simple and flexible to account for your use cases.

This is a component based on the excellent [Downshift](https://github.com/downshift-js/downshift) library, which controls user interactions and state for you so you can create your own autocomplete/dropdown/select/etc. components. It is combined with the [pelias-js](https://www.npmjs.com/package/pelias-js) client library which manages interaction with a Pelias API for you. The component uses a [render prop][use-a-render-prop] which gives you maximum flexibility with a minimal API because you are responsible for the rendering of everything and you simply apply props to what you're rendering.

This differs from other solutions which render things for their use case and then expose many options to allow for extensibility resulting in a bigger API that is less flexible as well as making the implementation more complicated and harder to contribute to.

[use-a-render-prop]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce
