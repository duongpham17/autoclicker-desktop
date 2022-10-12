const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Electron-tutorial-app-win32-ia32/'),
    authors: 'Tung Duong Pham',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'autoclicker.exe',
    setupExe: 'Autoclicker.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', '96x96.ico')
  })
}