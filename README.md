# javillegas.dev — Personal Portfolio

Personal portfolio of Javier Villegas, built with [Astro](https://astro.build/) and
deployed to GitHub Pages on the custom domain **javillegas.dev**.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the production build locally
```

## Contact form

The contact form uses [EmailJS](https://www.emailjs.com/). Copy `.env.example` to `.env`
and fill the `PUBLIC_EMAILJS_*` values (publishable client keys). In CI they are provided
as GitHub repository **Variables**.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. The `public/CNAME` file pins the custom domain.

The previous React (create-react-app) version is preserved as the tag `react-cra-legacy`
and the branch `archive/react-cra`.
