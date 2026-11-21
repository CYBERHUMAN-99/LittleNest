# LittleNest — DVL Web Studio portfolio project

A responsive static product landing page with a Formspree-powered **order request** form. This is not a full online store: it does not process payments, manage inventory, calculate shipping, create customer accounts, or confirm/fulfil orders.

## Project files

- `index.html` — page structure and content
- `e-commerce.css` — responsive design and styling
- `e-commerce.js` — navigation, validation, total calculation and Formspree submission
- `config.js` — Formspree endpoint and demo price settings
- `netlify.toml` — basic static-site deployment and security headers

## 1. Configure Formspree

Open `config.js` and replace `PASTE_YOUR_FORMSPREE_ENDPOINT_HERE` with the working endpoint from the store owner's Formspree dashboard, for example `https://formspree.io/f/abcdefgh`. Keep the quotes. Do not put a Formspree API key, password, or private credential in frontend code. The form endpoint itself is designed to be used by the website.

If you already connected Formspree in another copy of this project, copy the exact working endpoint from that copy or from the Formspree dashboard.

## 2. Configure the product

In `config.js`, change `unitPriceNGN` to the seller-approved price. The current ₦148,500 is only a demo value. Update the package contents, product descriptions, images, delivery coverage, delivery charges, payment terms, contact details and FAQs in `index.html` using information the business has verified. Do not publish placeholder product claims.

The form total currently equals unit price × quantity. It does not include delivery fees, discounts, tax or quantity-based discounts. If the seller uses tiered pricing or delivery fees, update the calculation and display before launch.

## 3. Test locally

1. Keep all project files in the same folder.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.
3. Submit a clearly labelled test order using fictional test details.
4. Confirm that the submission appears in the correct Formspree account and notification email.
5. Test required fields, invalid email/phone input, quantity changes, mobile navigation and the success/error messages.
6. Delete test submissions from the Formspree dashboard if you do not need them.

Do not test with real customer data until the business has approved the content, privacy notice and data-handling process.

## 4. Deploy with Netlify

### Quick deploy

1. Sign in to Netlify and choose **Add new site → Deploy manually** (wording may change).
2. Drag the entire project folder into the deployment area. Do not upload only `index.html`; CSS, JavaScript and config files must be included.
3. Wait for the deploy to finish and open the generated `netlify.app` address.
4. Test the live form again. A local test does not prove that the deployed form works.
5. Change the generated site name in Netlify if you want a cleaner preview URL.

### GitHub deployment (recommended for ongoing work)

1. Create a GitHub repository for the project.
2. Upload/push all project files to the repository.
3. In Netlify choose **Add new site → Import an existing project** and connect the repository.
4. For this plain HTML/CSS/JS project, set the publish directory to `.` and leave the build command empty.
5. Deploy. Future pushes to the connected branch can trigger new deployments.

## 5. Before a real client launch

- Obtain approval for all copy, prices, product details, product photos and brand assets.
- Replace all demo copy and stock images with accurate, licensed business assets.
- Remove or replace sample reviews; never invent testimonials, ratings, scarcity or sales claims.
- Confirm delivery locations, fees, delivery estimates, returns/refunds and payment terms.
- Use a Formspree account controlled by the client where possible; confirm the notification email and who can access submissions.
- Add a clear privacy notice explaining what data is collected, why, who receives it, how long it is kept and how customers can make privacy requests. Get appropriate legal/privacy review for the business and jurisdiction.
- Test the deployed form and mobile layout on real devices.
- Connect the client's domain and confirm HTTPS is active.
- Hand over the source files, repository/site access, domain ownership details and service-account ownership to the client.

## Scope reminder

This is a lead/order-request landing page for a cash-on-delivery or manual-confirmation workflow. It is not a payment checkout. For card/bank payments, inventory, automated order management, shipping integrations or customer accounts, scope a suitable e-commerce platform or secure backend/payment-gateway integration separately.
