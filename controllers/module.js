import defaultKeys from '../init/keyDefault.js';
export const decrypt = (string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(string, defaultKeys);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        console.error("Decryption failed:", error.message);
        return null;
    }
};
