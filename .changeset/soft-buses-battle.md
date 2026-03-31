---
"@liketysplit/react-luna": minor
---

Add all public component work merged after `v0.21.0`.

This release adds:

- `LunaApp` as the application host for routed pages
- `LunaWireframe` as the structural shell primitive with named regions
- `LunaPanel` as a labeled surfaced content wrapper
- `LunaPane` as a quiet boundary and separator helper
- `LunaIcon` as the first-party icon surface
- root package exports for `LunaWireframe`, `LunaToast`, and `LunaTooltip`
- component-specific theme tokens for the new app-shell slice
- Storybook stories, tests, docs, and screenshot manifests for the new app-shell components
- expanded internal icon coverage and icon manifests
- first-party icon adoption in `LunaNotification` and `LunaNotificationGroup`

This release also keeps the current visual defaults intact while lifting the important app-shell styling into the default theme for override through `ThemeProvider`.
