# Publishing Guide for angular-hijri-gregorian-date-time-picker

## Prerequisites

Before publishing to npm, ensure you have:

1. **npm account** - Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI logged in** - Run `npm login` and enter your credentials
3. **Git repository** is up to date with all changes committed
4. **Package version** is updated appropriately (currently: 1.5.0)

## Pre-Publishing Checklist

- [x] Version number updated in `package.json` (1.5.0)
- [x] CHANGELOG.md created and updated with all changes
- [x] README.md is comprehensive and up to date
- [x] LICENSE file exists (MIT)
- [x] All tests pass
- [x] Code is properly formatted
- [x] No console.log or debug statements
- [x] Dependencies are up to date

## Build the Library

### Step 1: Clean previous builds (optional)
```bash
rm -rf dist
```

### Step 2: Build the Angular library
```bash
npm run build hijri-gregorian-datepicker
# OR
ng build hijri-gregorian-datepicker --configuration production
```

This will create a production build in the `dist/hijri-gregorian-datepicker` folder.

### Step 3: Verify the build
```bash
ls -la dist/hijri-gregorian-datepicker
```

You should see:
- `package.json`
- `README.md`
- `LICENSE`
- `CHANGELOG.md`
- `*.d.ts` files (TypeScript declarations)
- `*.js` files (compiled JavaScript)
- `*.metadata.json` files

## Testing the Package Locally (Optional but Recommended)

### Option 1: Link locally
```bash
cd dist/hijri-gregorian-datepicker
npm link

# In your test project
npm link angular-hijri-gregorian-date-time-picker
```

### Option 2: Pack and install
```bash
cd dist/hijri-gregorian-datepicker
npm pack

# This creates angular-hijri-gregorian-date-time-picker-1.5.0.tgz
# In your test project:
npm install /path/to/angular-hijri-gregorian-date-time-picker-1.5.0.tgz
```

## Publishing to npm

### Step 1: Navigate to the dist folder
```bash
cd dist/hijri-gregorian-datepicker
```

### Step 2: Verify package contents
```bash
npm pack --dry-run
```

This shows what will be included in the published package.

### Step 3: Publish to npm

#### For first-time publishing or public access:
```bash
npm publish --access public
```

#### For subsequent updates:
```bash
npm publish
```

### Step 4: Verify publication
Visit your package page:
```
https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker
```

## Post-Publishing Steps

### 1. Tag the release in Git
```bash
git tag v1.5.0
git push origin v1.5.0
```

### 2. Create a GitHub release
- Go to your GitHub repository
- Click "Releases" → "Create a new release"
- Select tag: v1.5.0
- Title: "Version 1.5.0 - Time Picker, Range Selection & Beautiful Custom Selects"
- Copy content from CHANGELOG.md
- Publish release

### 3. Update documentation
- Update main README.md with installation instructions
- Add migration guide if needed
- Update demo application

## Version Management

### Semantic Versioning (SemVer)
We follow semantic versioning: MAJOR.MINOR.PATCH

- **MAJOR** (1.x.x) - Breaking changes
- **MINOR** (x.5.x) - New features, backward compatible
- **PATCH** (x.x.1) - Bug fixes, backward compatible

### Updating version for next release:
```bash
# For patch updates (bug fixes)
npm version patch

# For minor updates (new features)
npm version minor

# For major updates (breaking changes)
npm version major
```

## Troubleshooting

### Issue: "You do not have permission to publish"
**Solution:** Run `npm login` and ensure you're logged in with correct credentials.

### Issue: "Package name already exists"
**Solution:** The package name is already taken. Our package name is `angular-hijri-gregorian-date-time-picker`.

### Issue: "Version already published"
**Solution:** You cannot republish the same version. Update the version number in `package.json`.

### Issue: "Cannot find module after install"
**Solution:** 
- Ensure `public-api.ts` exports all necessary components
- Check `ng-package.json` configuration
- Rebuild the library

### Issue: Build errors
**Solution:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Angular cache: `ng cache clean`
- Try building again

## Testing After Publishing

### Install in a fresh Angular project:
```bash
npm install angular-hijri-gregorian-date-time-picker
```

### Import the module:
```typescript
import { HijriGregorianDatepickerModule } from 'angular-hijri-gregorian-date-time-picker';

@NgModule({
  imports: [HijriGregorianDatepickerModule]
})
```

### Use in template:
```html
<hijri-gregorian-datepicker
  [enableTime]="true"
  [useMeridian]="true"
  [selectionMode]="'range'"
></hijri-gregorian-datepicker>
```

## Unpublishing (Use with Caution)

If you need to unpublish within 72 hours:
```bash
npm unpublish angular-hijri-gregorian-date-time-picker@1.5.0
```

⚠️ **Warning:** Unpublishing is permanent and can break projects depending on your package.

## Support

For issues or questions:
- GitHub Issues: https://github.com/hanygamal72/angular-hijri-gregorian-date-time-picker/issues
- npm Page: https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker

---

**Ready to publish?** Follow the steps above and your package will be live on npm! 🚀
