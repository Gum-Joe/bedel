# Roadmap
This is a roadmap of all the features that we want to eventually add to bedel. It is on a version by version basis. It is in chronological order.

#### v1.0.0:
- [x] :lipstick: Add notifications sidebar
- [x] :lipstick: Add tasks sidebar ([#14](https://github.com/Gum-Joe/bedel/issues/14))
- [x] :shirt: Fix code climate complaints
- [ ] :white_check_mark: Add server side tests for socket.io api + untested stuff (aiming for >=90% coverage) :construction: ([#33](https://github.com/Gum-Joe/bedel/issues/33))
- [ ] :lipstick: Redo base ui + react router + themes construction method, using AdminLTE ([https://almsaeedstudio.com/themes/AdminLTE/index2.html](https://almsaeedstudio.com/themes/AdminLTE/index2.html)) as inspiration
- [ ] :white_check_mark: Add client side tests for react components and redux reducers
- [ ] :lock: Add GitHub authentication + make config/secrets.yml hidden
- [ ] :rocket: Add script to deploy to heroku with secrets
- [ ] :art: :rocket: Add an app api to register apps and allow launching from dashboard
- [ ] :lock: Add HTTPS (important, but you will need to make your own certificates)
- [ ] :computer: Dashboard:
  - [ ] :lipstick: Add stats badges
  - [ ] :lipstick: :computer: Add build engine
  - [ ] :lipstick: Add table of build results
  - [ ] :lipstick: Add quick actions
- [ ] :fireworks: Release first beta
- [ ] :computer: Settings:
  - [ ] :lipstick: :computer: Add system information (secrets & config) view & edit
  - [ ] :lipstick: Add profile view & edit
- [ ] :speech_balloon: Messaging:
  - [ ] :computer: Add messaging app in separate repo and have it installed by default
  - [ ] :lipstick: Add to sidebar
- [ ] :fireworks: Release second beta
- [ ] :package: Add package manager to install apps
- [ ] :lipstick: Covert login view (views/login.ejs) to react and store the login in redux, so that we have a true single-page app. (v2.0.0?)
- [ ] :bug: Bug fixes
- [ ] :fireworks: Release a couple of release candidates
- [ ] :bug: Bug fix them
- [ ] :fireworks: Create a final release candidate
- [ ] :fireworks: Have the final release candidate judges by a 3rd party audience
- [ ] :bug: Fix bugs the 3rd party finds
- [ ] :clock7: :fireworks: Release v1.0.0 by July 2017
