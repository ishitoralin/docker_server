import path from 'path'

const defaultPaths = {
    keyPath: path.resolve(process.cwd(), "otakey.pem"),
    certPath: path.resolve(process.cwd(), "otakey.cert"),
}

export default defaultPaths