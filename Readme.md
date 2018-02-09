1. Initialize Project - npm init
2. Install Webpack globally - npm install -g webpack
3. Run - npm install
4. Open 'creds.js' file from 'config' folder and update your username and password for sharepoint site
5. Open 'coreOptions.js' file and update 'siteUrl' property.
6. Run 'gulp clean'.
7. Run 'gulp build'.
8. Update 'paths' object from 'gulpfile.js' for any external libraries added into project which you don't want to bundle with your custom code.
9. To deploy external libraries, run 'gulp deployExternals'.
10. To deploy your custom code, run 'gulp deploy'.
