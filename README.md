# JB Medical Center — General Service

Static website for JB Medical Center, Sonarpara, Sylhet. Plain HTML/CSS/JS — no build step, works on any static host.

## Structure

- `index.html`, `services.html`, `doctors.html`, `about.html`, `contact.html`
- `assets/css/style.css` — brand styles (colors, Poppins font)
- `assets/js/main.js` — mobile nav toggle + appointment form
- `assets/images/brand/` — logo.svg, favicon.svg (recreated from brand guide)
- `assets/images/doctors/` — doctor photos (see filenames below)
- `assets/images/facility/` — facility / hero photos (see filenames below)

## Adding real photos

Images are referenced by filename but not yet included. Drop files with these exact names into the folders below and they'll appear automatically (no code changes needed):

**assets/images/doctors/**
- dr-jasmin-akter.jpg
- dr-fatima-tuz-zuhura.jpg
- dr-abul-fateh.jpg
- dr-prodip-kumar-pal.jpg
- dr-topon-chakraborty.jpg
- dr-bipasha-dey.jpg
- dr-shamsun-nahar-tahmida.jpg
- dr-tasnia-akter-suity.jpg

**assets/images/facility/**
- hero-banner.jpg (homepage hero background)
- reception.jpg / reception-wide.jpg
- waiting-area.jpg
- lab.jpg
- xray-room.jpg
- blood-collection.jpg
- consultation-room.jpg
- doctor-consultation.jpg
- gcc-checkup.jpg
- office.jpg

Recommended size: at least 1200px on the longest side, JPG or WebP.

## Brand

- Colors: `#3150a3` `#36b4e8` `#ac71b0` `#4d5daa` `#ededed`
- Font: Poppins (Google Fonts)
- Logo: recreated in `assets/images/brand/logo.svg` from the brand guide. For pixel-perfect fidelity, export the original artwork from `Logo.pdf` and replace this file.

## Deploy

Any static host works (GitHub Pages, Netlify, cPanel, etc.) — just upload the folder as-is.
