import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte key for AES-128
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV

export function encrypt(text: string): string {
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return encrypted.toString();
}

export function decrypt(encryptedText: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryptObject<T>(object: T): string {
  return encrypt(JSON.stringify(object));
}

export function decryptObject<T>(encryptedObject: string): T {
  return JSON.parse(decrypt(encryptedObject)) as T;
}
