# Contributing

Ideally everyone should be comfortable contributing to this repository.  Here are some quick and dirty rules for being a good citizen:

1. Atomic commits.  One commit should equal one feature or one removable unit of code.  Okay, this is super ambiguous, but just ask yourself this:  If this code breaks in production, how tough is it going to be to prune the commits out and deploy something functional?
2. Blog post commits.  Commit messages should be no longer than 50 characters.  Put details about the commits into a body below the commit message.  Github (and other Git repo management suites) turns these commit messages into nice interfaces to summarize your work.
3. Document your work.  Even if it's just a few blurbs in the docs folder.  If you wrote it, you own it.  Your code and your tests are not documentation.  The only thing that is documentation, is documentation.
4. Conform to the Styleguide or add to it.  No UI should exist without a permanent reference viewable in the Styleguide.
5. Build before any release:  `npm run build`
6. **Never work on master**.  All work should be done in feature branches.  Master is the system of truth and where release builds will come from.  Master should never have broken tests, or broken code knowingly merged in.
7. Squash feature branches and rebase merge to master.  If you have 30 commits on a feature branch, follow this process:
  * `git rebase -i <COMMIT HASH OF FIRST COMMIT BEFORE YOUR BRANCH>`
  * Intelligently pick or squash your 30 commits into as few as possible, ideally 1.
  * Name that commit with 50 characters or less, and write a small blog style post about your changes.
  * `git checkout master && git pull && git checkout - && git rebase master`
  * You are now ready to submit a pull request.  Github will actually turn your blog style commit message into the pull request itself.
