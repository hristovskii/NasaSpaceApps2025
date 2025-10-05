# NasaSpaceApps2025

## Docker

Build the image (from repository root):

```bash
docker build -t nasaspaceapps2025:latest .
```

Run the container (maps port 3000):

```bash
docker run --rm -p 3000:3000 \
	-e NODE_ENV=production \
	nasaspaceapps2025:latest
```

Notes:

- This project uses pnpm (corepack). The Dockerfile enables corepack so no extra setup is required.
- If you use environment variables (e.g., API keys), pass them with `-e VAR=value` or use `--env-file`.
- For development you can run `pnpm dev` locally; the Dockerfile is optimized for production builds.
