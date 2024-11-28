/** eslint-disable ts-ignore */

const DOCKER_IMAGE = 'farmgame'
const DOCKER_REMOTE_TAG = 'plhuan/farmgame'
const fs = require("fs")
const { execSync } = require("child_process")

const versionData = fs.readFileSync(`version.txt`, "utf-8")

const versionArr = versionData.split('.')
const newVersion =  `${versionArr.slice(0, -1).join('.')}.${(Number(versionArr.at(-1)) + 1)}`
fs.writeFileSync('version.txt', newVersion)
console.log(`TAG: ${DOCKER_REMOTE_TAG}:${newVersion}`);
const script = `npm run build-pro && npm run docker:built && docker tag ${DOCKER_IMAGE} ${DOCKER_REMOTE_TAG}:${newVersion} && docker push ${DOCKER_REMOTE_TAG}:${newVersion}`
execSync(script, { stdio: "inherit" })
