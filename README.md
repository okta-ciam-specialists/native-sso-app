# native-sso-app

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) ![GitHub](https://img.shields.io/github/license/okta-ciam-specialists/native-sso-app) ![GitHub contributors (via allcontributors.org)](https://img.shields.io/github/all-contributors/okta-ciam-specialists/native-sso-app) [![wakatime](https://wakatime.com/badge/user/28857d2c-0688-4cac-b02c-d81ceead7b94/project/8c50d412-60ff-4cc9-bff1-22de72af7197.svg)](https://wakatime.com/badge/user/28857d2c-0688-4cac-b02c-d81ceead7b94/project/8c50d412-60ff-4cc9-bff1-22de72af7197)

![GitHub forks](https://img.shields.io/github/forks/okta-ciam-specialists/native-sso-app?style=social)

![GitHub followers](https://img.shields.io/github/followers/okta-ciam-specialists?style=social)

|     |     |
| --- | --- |
| [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/okta-ciam-specialists/native-sso-app.git)  | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fokta-ciam-specialists%2Fnative-sso-app) |

A simple React SPA (powered by [Vite](https://vitejs.dev)) that represents a &#34;native&#34; application in order to initiate an OAuth compliant Native SSO to a secondary application.

TODO: Fill out this long description.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

## Install

```bash
npm install
```

### Configuration

By default, this project utilizes an existing Okta tenant. For local development, `http://localhost:3000` & `http://localhost:3000/login/callback` are allowed URLs.

You will need to spin up and use your own tenant if you need to use different redirect URLs or want to modify the configuration.

Follow the steps necessary to setup your application [here](https://developer.okta.com/docs/guides/configure-native-sso/main/#native-sso-flow).

Update the `.env` file with the appropriate values:
```env
VITE_OKTA_CLIENT_ID=
VITE_OKTA_ISSUER=
```

## Usage

### Running Locally

```bash
npm run dev
```

### Deploying
This application was initially deployed using Vercel. To deploy to your own instance, use the 'Deploy' button at the top of the page and follow Vercel's guide(s).

## Maintainers

[@eatplaysleep](https://github.com/eatplaysleep)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © 2023 Danny Fuhriman
