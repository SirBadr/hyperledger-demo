# software reqiurements to run this repository
1. install cURL (https://curl.se/download.html)
2. install Docker and Docker compose (https://www.docker.com/products/docker-desktop/) - Docker version 17.06.2-ce or greater is required.
3. Go Programming language (https://go.dev/dl/) - version 1.12.x is required.
4. Node.js Runtime and NPM (https://nodejs.org/en/download) - If you will be developing applications for Hyperledger Fabric leveraging the Hyperledger Fabric SDK for Node.js, version 8 is supported from 8.9.4 and higher. Node.js version 10 is supported from 10.15.3 and higher
5. Python 

## Extras if you are using windows:
If you are developing on Windows 7, you will want to work within the Docker Quickstart Terminal which uses Git Bash (https://git-scm.com/downloads) and provides a better alternative to the built-in Windows shell.

However experience has shown this to be a poor development environment with limited functionality. It is suitable to run Docker based scenarios, such as Getting Started, but you may have difficulties with operations involving the make and docker commands.

On Windows 10 you should use the native Docker distribution and you may use the Windows PowerShell. However, for the binaries command to succeed you will still need to have the uname command available. You can get it as part of Git but beware that only the 64bit version is supported.

Before running any git clone commands, run the following commands:

git config --global core.autocrlf false
git config --global core.longpaths true
You can check the setting of these parameters with the following commands:

git config --get core.autocrlf
git config --get core.longpaths
These need to be false and true respectively.

The curl command that comes with Git and Docker Toolbox is old and does not handle properly the redirect used in Getting Started (https://hyperledger-fabric.readthedocs.io/en/release-1.4/getting_started.html). Make sure you install and use a newer version from the cURL downloads page

For Node.js you also need the necessary Visual Studio C++ Build Tools which are freely available and can be installed with the following command:

npm install --global windows-build-tools
See the NPM windows-build-tools page for more details. (https://www.npmjs.com/package/windows-build-tools)

Once this is done, you should also install the NPM GRPC module with the following command:

npm install --global grpc

# Installation references
1. https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html

# hyperledger-demo to run fabcar javascript demo code
1. navigate to repository.
2. $ cd fabcar
3. $ ./startFabric.sh javascript
4. $ cd ./javascript
5. $ node enrollAdmin.js
6. $ node registerUser.js
7. $ node query.js
8. $ node invoke.js
9. $ node query.js
