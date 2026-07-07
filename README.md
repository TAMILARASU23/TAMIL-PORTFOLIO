# Tamilarasu S | Professional E-Commerce Executive Portfolio

A state-of-the-art, high-performance, and responsive single-page portfolio website for **Tamilarasu S (Tamil)**, E-Commerce Executive & Marketplace Operations Specialist.

## Features
- **Sleek Glassmorphism Dark Theme**: Obsidian color palette with vibrant neon accent glows (blue, gold, green, purple).
- **Core Stats Counter**: Counts up automatically when scrolling into view.
- **Responsive Timelines & Grids**: Beautiful layouts showing marketplace logos, services, career path, academic background, and credentials.
- **Intersection Observer Animations**: Elements fade in smoothly as you scroll down.
- **Dual Inquiry System**:
  1. **Email Notifications**: Form entries submit via AJAX directly to Tamil's inbox using **Web3Forms** (requires a free Access Key).
  2. **WhatsApp Notifications**: Compiled inquiry data is formatted with markdown and emojis, then sent straight to WhatsApp with one click.
- **Access Key Activation Assistant**: A built-in modal pops up if the user tries to send an email without setting their Web3Forms Access Key, allowing them to enter it on the fly and save it locally.

## Project Structure
- `index.html`: Semantic markup, Google Fonts (Outfit & Plus Jakarta Sans), FontAwesome icon packs, and the copy content.
- `style.css`: Clean variables, typography styling, layout systems, timing functions, timeline grids, glass container assets, hover animations, responsive breakpoints.
- `app.js`: Script for header scroll highlights, menu toggling, section tracking, progressive stats count-up, AJAX submission, modal interaction, and WhatsApp pre-filled text compiles.

## Getting Started

### 1. Run Locally
To preview the portfolio on your local machine, run a local web server from this directory. For example, if you have Python installed:
```bash
python -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

### 2. Set Up Email Notifications
To start receiving emails from the contact form:
1. Go to [web3forms.com](https://web3forms.com/).
2. Submit your email address (`tamilarasusakthi2005@gmail.com`) to generate a free Access Key.
3. Once you receive the key in your inbox:
   - Paste it in the interactive setup popup modal when testing locally (it will save to your browser's local storage).
   - Alternatively, open `index.html` and replace `YOUR_ACCESS_KEY_HERE` at line 484 with your key:
     ```html
     <input type="hidden" name="access_key" id="web3FormsKey" value="YOUR_ACTUAL_ACCESS_KEY_HERE">
     ```
4. Save the file, and your contact form is fully active!

## Customization
- **Profile Avatar**: In the Hero section, you can add an image of yourself inside the `.visual-wrapper` div in `index.html`, or replace the tech dashboard visual with your profile photo.
- **Projects**: Edit the B.Sc. Final Year Project card or add additional items inside the `#projects` section in `index.html`.
- **Contact Details**: Keep your phone number (`+919487676941`) and email (`tamilarasusakthi2005@gmail.com`) updated. If you change your phone number, make sure to update the WhatsApp handler link inside both `index.html` (line 33) and `app.js` (line 267) to match the new number.
