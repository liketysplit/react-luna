---
"@liketysplit/react-luna": minor
---

Add the first Luna app-shell primitives and expand the internal icon surface.

This release adds:

- `LunaApp` as the application host for routed pages
- `LunaWireframe` as the structural shell primitive with named regions
- `LunaPanel` as a labeled surfaced content wrapper
- `LunaPane` as a quiet boundary and separator helper
- component-specific theme tokens for the new app-shell slice
- Storybook stories, tests, docs, and screenshot manifests for the new app-shell components
- expanded internal icon coverage and icon manifests
- first-party icon adoption in `LunaNotification` and `LunaNotificationGroup`

This release also keeps the current visual defaults intact while lifting the important app-shell styling into the default theme for override through `ThemeProvider`.
