This folder contains lifecycle hooks for the Multiple Composers app.

index.js is the hooks' entry point.

When it makes sense for the app to broadcast data as a result of a specific action,
index.js is a good place for that.

When it makes sense for that logic to differ depending on the environment MC is
run into, it feels good to call, from index.js, the same-name method that lives
in that environment's hooks file. E.g. index.js' `closeComposer()` whose only
purpose is to call `ExtensionHooks.closeComposer()` when MC is run within extensions.
