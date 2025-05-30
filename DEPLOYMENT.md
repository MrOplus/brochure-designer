# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Automatic Deployment

The deployment happens automatically when you:
1. Push commits to the `main` or `master` branch
2. The GitHub Action workflow runs automatically
3. Your site is deployed to `https://MrOplus.github.io/brochure-designer/`

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 2. Repository Name

If your repository name is different from `brochure-designer`, update the base path in:
- `.github/workflows/deploy.yml` (line 42: `VITE_BASE_PATH`)
- `package.json` (in the `build:github` script)

### 3. Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure your domain's DNS to point to `MrOplus.github.io`
3. In GitHub Pages settings, add your custom domain

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build:github

# The built files will be in the `dist/` folder
# You can then manually upload these to your hosting provider
```

## Troubleshooting

### Common Issues:

1. **404 Error**: Make sure the base path in `vite.config.ts` matches your repository name
2. **Assets not loading**: Check that the `VITE_BASE_PATH` environment variable is correctly set
3. **Workflow fails**: Check the Actions tab for detailed error logs

### Workflow Status

You can check the deployment status in the **Actions** tab of your GitHub repository.

### Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built files locally so you can test before deployment.
