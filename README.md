# HTTPS on localhost

This repo shows how to serve your app on https://localhost during development using `parcel` and a few other tools.

## Prerequisites

1. Node.js.
2. .NET CLI.
3. OpenSSL (note that your local Git install on Windows should include a copy of OpenSSL).

## Environment variables

Have a look at the `.env` file and configure with appropriate values.

|Key|Description|
|---|---|
|`OPENSSL_PATH`|The path to your local copy of `openssl.exe`, this should end with `openssl`. <br/>e.g. `C:\Program Files\Git\usr\bin\openssl`|
|`CERT_PASSWORD`|The password for the certificate.|
|`ENTRYPOINT`|The entrypoint to your app, e.g. `src/index.html`.|
|`PORT`|The port, e.g. `443`.|

## Certificate creation

### Remove existing certificates

You might need to remove an existing dev cert, if so:

```bash
npm run dev-certs:clean
```

This runs the following .NET CLI command:

```bash
dotnet dev-certs https --clean
```

### Generate and trust the certificate

```bash
npm run dev-certs
```

This does the following:

1. Create and export a `.pfx` certificate to the `cert` folder using the .NET CLI.
   - The `CERT_PASSWORD` environment variable defined in the `.env` file is used as the certificate's password.
   - `--verbose` logging is enabled, which helps diagnose any issues if the process fails.
   - The certificate is 'trusted' by adding it to the local certificate store.
2. Convert the `.pfx` certificate to a `.pem` certificate and create a `.key` file.
   - This uses Node.js, OpenSSL and npm package `pem`.
   - The `.pem` and `.key` files are used by parcel when developing against localhost.

## Start https://localhost

```bash
npm start
```

## Build the production app

```bash
npm run build
```