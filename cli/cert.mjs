import pem from "pem";
import { PFX2PEM } from "pem/lib/convert.js";
import fs from "fs";
import "dotenv/config";

pem.config({
  pathOpenSSL: process.env.OPENSSL_PATH
});

const pass = process.env.CERT_PASSWORD;

// GET .KEY FILE - without this, HMR won't work
const pfx = fs.readFileSync(process.env.CERT_PFX);
pem.readPkcs12(pfx, { p12Password: pass }, (err, cert) => {
  if (!!err) {
    console.error(err);
    return;
  }
  // console.log(cert.key);
  fs.writeFileSync(process.env.CERT_KEY, cert.key);
});

// GET .PEM FILE
PFX2PEM(process.env.CERT_PFX, process.env.CERT_PEM, pass, (errPem, successPem) => {
  if (!successPem) {
    console.error(errPem);
    return;
  }
  
  console.log(`Certificate '${process.env.CERT_PEM}' created!`);
});