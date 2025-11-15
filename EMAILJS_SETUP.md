# EmailJS Setup Instructions

Follow these steps to set up email forwarding for your contact form:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## 2. Add an Email Service

1. Go to the **Email Services** section
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (you'll need this later)

## 3. Create an Email Template

1. Go to the **Email Templates** section
2. Click "Create New Template"
3. Use this template structure:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have received a new message from your TripleC contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Country: {{country}}
Course Interest: {{course_interest}}

Message:
{{message}}

---
This message was sent via the TripleC Training Center contact form.
```

4. Save the template and copy the **Template ID**

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called API Key)
3. Copy this key

## 5. Configure Your Project

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. **Important:** Make sure `.env` is in your `.gitignore` file (it should be by default)

## 6. Update the Recipient Email

In `src/components/ContactForm.tsx`, find this line:

```typescript
to_email: 'your-email@example.com' // Replace with your email
```

Replace `'your-email@example.com'` with the email address where you want to receive the form submissions.

## 7. Test Locally

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Go to the Contact Us page
3. Fill out and submit the form
4. Check your email for the submission

## 8. Deploy to GitHub Pages

For GitHub Pages, you need to set environment variables differently since `.env` files are not deployed:

**Option A: Hardcode values (less secure but simple)**
- Replace the environment variables directly in `ContactForm.tsx`

**Option B: Use GitHub Secrets with Actions (recommended)**
- Add secrets in GitHub repository settings
- Configure your build workflow to inject them

## Important Notes

- EmailJS free tier allows **200 emails per month**
- Keep your Public Key safe but know it will be visible in the client-side code
- Never commit your `.env` file to version control
- The Service ID and Template ID are not sensitive, but the Public Key should be kept private when possible

## Troubleshooting

If emails aren't sending:
1. Check browser console for errors
2. Verify all three IDs are correct
3. Make sure your EmailJS service is connected and active
4. Check your email service's spam folder
5. Verify you haven't exceeded the free tier limit

## Alternative: Direct Implementation (No .env)

If you prefer to hardcode the values, replace this in `ContactForm.tsx`:

```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
```

With:

```typescript
const serviceId = 'service_xxxxxxx'
const templateId = 'template_xxxxxxx'
const publicKey = 'your_public_key_here'
```
