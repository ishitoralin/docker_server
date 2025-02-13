import forge from "node-forge";
import fs from "fs"
import defaultPaths from '../init/pathDefault.js';

// 1. 生成私鑰
export const generateCert = () => {
    const isKeyExist = fs.existsSync(defaultPaths.keyPath)
    const isCertExist = fs.existsSync(defaultPaths.certPath)
    if (!isKeyExist || !isCertExist) {
        const keypair = forge.pki.rsa.generateKeyPair(2048); // 2048 位金鑰
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);

        // 2. 生成自簽名憑證
        const cert = forge.pki.createCertificate();
        cert.publicKey = keypair.publicKey;
        cert.serialNumber = "01"; // 憑證的序列號 (可自訂)
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1); // 有效期一年

        // 憑證的主體 (subject) 和頒發者 (issuer)
        const attrs = [
            { name: 'commonName', value: 'otaserver' },
            { name: 'countryName', value: 'TW' },
            { name: 'stateOrProvinceName', value: 'Taiwan' },
            { name: 'localityName', value: 'New Taipei City' },
            { name: 'organizationName', value: 'shihu' },
            { name: 'organizationalUnitName', value: 'OT' },
        ];

        cert.setSubject(attrs);
        cert.setIssuer(attrs);

        // 使用私鑰對憑證進行簽名
        cert.sign(keypair.privateKey, forge.md.sha256.create());

        // 3. 將私鑰和憑證轉換為 PEM 格式
        const certPem = forge.pki.certificateToPem(cert);

        // 4. 將私鑰和憑證寫入檔案
        fs.writeFileSync(keyPath, privateKey, { encoding: "utf8" });
        fs.writeFileSync(certPath, certPem, { encoding: "utf8" });

        console.log("Private key and certificate generated successfully!");
        console.log(`Private key path: ${keyPath}`);
        console.log(`Certificate path: ${certPath}`);
    }
}
