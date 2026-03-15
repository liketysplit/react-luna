# Changesets

Run `npm run changeset` whenever a merged change should affect the published package.

The release workflow will:
- open or update a versioning pull request from pending changesets
- bump `package.json`
- update `CHANGELOG.md`
- publish to npm after the version pull request is merged
