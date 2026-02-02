# GitHub Pages Deployment Instructions

## Quick Start

Your repository is now configured for GitHub Pages deployment! Follow these steps to enable it:

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/troy0101/MembershipModeler
2. Click on **Settings** (top right)
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - Source: Select **GitHub Actions** from the dropdown

That's it! The workflow will automatically deploy your site.

## Step 2: Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (takes 2-3 minutes)
4. Once complete, your site will be live at:
   
   **https://troy0101.github.io/MembershipModeler/**

## How It Works

- Every push to the `main` branch automatically triggers a deployment
- The workflow:
  1. Installs dependencies
  2. Builds the React app
  3. Deploys the build folder to GitHub Pages
- You can also manually trigger deployment from the Actions tab

## Troubleshooting

### If the workflow doesn't run:
- Make sure GitHub Actions are enabled in your repository settings
- Check that the workflow file exists at `.github/workflows/deploy.yml`

### If the build fails:
- Check the Actions tab for error logs
- Ensure all dependencies are correctly listed in `package.json`

### If the page shows 404:
- Verify GitHub Pages is enabled in repository settings
- Ensure "Source" is set to "GitHub Actions"
- Wait a few minutes after the first deployment

## Local Development

To run the app locally:

```bash
npm install
npm start
```

The app will open at http://localhost:3000

To create a production build:

```bash
npm run build
```

## Need Help?

If you encounter issues, check:
1. The Actions tab for workflow logs
2. Repository Settings → Pages to confirm configuration
3. The README.md for additional documentation
