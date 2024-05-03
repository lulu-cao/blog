# Blog

This is an ad-free platform for your RSS reading and personal blogging (upcoming). Check out the site at [https://lulu-cao.github.io/blog/](https://lulu-cao.github.io/blog/).

This repo provides the frontend code for the app. The backend repo code is available [here](https://github.com/lulu-cao/blog-cms-django).

## Start the app
```
npm install
npm run dev
```

## Deployment
1. Generate the `/dist` folder
    ```
    npm run build
    ```

2. Switch to `gh-pages` branch and remove the files there with `git rm -rf .`.

3. Copy and paste the `/dist` folder into `gh-pages` branch. Then, force the update with your `dist` folder:
    ```
    git add .
    git commit -m "deploy"
    git subtree split --prefix dist -b temp-branch
    git push origin temp-branch:gh-pages --force
    git branch -D temp-branch
    ```

